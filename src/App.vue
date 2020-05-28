<template>
  <div id="app">

    <site-header></site-header>

    <div class="app__main-container">

      <main>

        <stylesheet-input
          :stylesheet-string.sync="stylesheetString"
          :stylesheet-parser-error="stylesheetParserError"
        ></stylesheet-input>

        <br/>
        <br/>

        <selector-message-list :selector-messages="selectorMessages"></selector-message-list>

      </main>

      <site-footer></site-footer>

    </div>

  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import css, { ParserError, Rule, Stylesheet } from 'css';

  import ClassNameValidator from '@/utils/classNameValidator';
  import BemClassNameParser from '@/utils/bemClassNameParser';
  import BemPartsValidator from '@/utils/bemPartsValidator';

  import SelectorMessage from '@/models/selectorMessage';
  import Message from '@/models/message';
  import MessageType from '@/enums/messageType';

  import SiteHeader from '@/components/SiteHeader.vue';
  import SiteFooter from '@/components/SiteFooter.vue';
  import StylesheetInput from '@/components/StylesheetInput.vue';
  import SelectorMessageList from '@/components/SelectorMessageList.vue';

  import '@/assets/styles/global.scss';

  @Component({
    components: {
      SiteHeader,
      SiteFooter,
      StylesheetInput,
      SelectorMessageList
    },
  })
  export default class App extends Vue {
    stylesheetString = `/* Incorrect BEM Class Names */

.site-header--dark__logo {
}

.Card__Title {
}

.shopping-list__item__image {
}

.site_header__logo {
}


/* Correct BEM Class Name */

.card__title--active {
}


/* Non Class Selectors */

body {
}

#comments {
}
`;

    stylesheetParserError: ParserError | null = null;
    selectorMessages: SelectorMessage[] = [];

    @Watch('stylesheetString', {immediate: true})
    onCssStringChanged(value: string) {
      this.processStylesheetString(value);
    }

    private processStylesheetString(cssString: string): void {

      this.stylesheetParserError = null;
      let ast: Stylesheet;

      try {
        // Try and get the Abstract Syntax Tree (AST) for the CSS string
        ast = css.parse(cssString);
      } catch (e) {
        const parserError: ParserError = e;

        this.stylesheetParserError = parserError;
        this.selectorMessages = [{
          selector: 'Unknown',
          line: parserError.line ?? 0,
          message: 'There is an error with the stylesheet. Reason: ' + parserError.reason ?? '',
          messageType: MessageType.critical
        }];

        return;
      }

      if (!ast.stylesheet) {
        throw new Error('The CSS contains no rules');
      }

      const rules: Rule[] = ast.stylesheet.rules.filter(x => (x as Rule).selectors !== undefined);
      const selectorMessages: SelectorMessage[] = [];

      for (const rule of rules) {
        for (const selector of rule.selectors ?? []) {

          const line = rule.position?.start?.line ?? 0;

          if (selector.startsWith('#')) {
            selectorMessages.push({
              selector: selector,
              line: line,
              message: 'This is an ID selector.',
              messageType: MessageType.info
            });

            continue;
          }

          if (!selector.startsWith('.')) {
            selectorMessages.push({
              selector: selector,
              line: line,
              message: 'This is an element type selector.',
              messageType: MessageType.info
            });

            continue;
          }

          const messages: Message[] = ClassNameValidator.validate(selector);

          if (!messages.length) {
            const bemParts = BemClassNameParser.parse(selector);
            messages.push(...BemPartsValidator.validate(bemParts));
          }

          if (!messages.length) {
            selectorMessages.push({
              selector: selector,
              line: line,
              message: 'This is a valid BEM class name',
              messageType: MessageType.success
            })
          }

          for (const message of messages) {
            selectorMessages.push({
              selector: selector,
              line: line,
              message: message.text,
              messageType: message.messageType
            })
          }
        }
      }

      this.selectorMessages = selectorMessages;
    }
  }
</script>

<style lang="scss">
  .app__main-container {
    margin: 0 auto;
    max-width: 65rem;
  }
</style>


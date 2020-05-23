import ResultType from "@/enums/resultType";
import BemPartType from "@/models/bemPartType";
<template>
  <div id="app">

    <div class="app__main-container">
      <div>
        <site-header :class-name="className"></site-header>

        <label for="className" class="app__input-label">
          CSS class name
        </label>
        <input
          v-model="className"
          id="className"
          type="text"
          class="app__input"
          autofocus
          autocomplete="off"
          spellcheck="false">

        <br />

        <label>
          CSS String
          <textarea v-model="cssString" cols="40" rows="5"></textarea>
        </label>
        

      </div>
    </div>

    <bem-parts :bem-parts="bemParts"></bem-parts>

    <display-messages :messages="messages"></display-messages>

    <site-footer></site-footer>

  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import css, {ParserError, Rule, Stylesheet} from 'css';

  import ClassNameValidator from '@/utils/classNameValidator';
  import BemPartsValidator from '@/utils/bemPartsValidator';
  import BemClassNameParser from '@/utils/bemClassNameParser';

  import Message from '@/models/message';
  import MessageType from '@/enums/messageType';
  import BemPart from '@/models/bemPart';

  import SiteHeader from '@/components/SiteHeader.vue';
  import SiteFooter from '@/components/SiteFooter.vue';
  import BemParts from '@/components/BemParts.vue';
  import DisplayMessages from '@/components/DisplayMessages.vue';
  import CssSelector from '@/models/cssSelector';
  import ResultType from '@/enums/resultType';

  @Component({
  components: {
    SiteHeader,
    SiteFooter,
    BemParts,
    DisplayMessages
  },
})
export default class App extends Vue {
  className = 'card__title--active';
  cssString = `
    @import 'custom.css';

    .card__title--active {
      border-color: blue;
    }

    .test1 .test2 {
    }
  `;

  cssParserError: ParserError | null = null;

  messages: Message[] = [];
  bemParts: BemPart[] = [];

  @Watch('className', { immediate: true } )
  onClassNameChanged(value: string) {
    this.processClassName(value);
  }

  @Watch('cssString', { immediate: true } )
  onCssStringChanged(value: string) {
    this.processCssString(value);
  }

  private processClassName(className: string): void {
    const messages = ClassNameValidator.validate(className);
    const containsCriticalIssues = messages.some(x => x.messageType === MessageType.critical);

    this.bemParts = containsCriticalIssues ? [] : BemClassNameParser.parse(className);

    if (!containsCriticalIssues) {
      messages.push(...BemPartsValidator.validate(this.bemParts));
    }

    this.messages = messages;
  }

  private processCssString(cssString: string): void {

    let ast: Stylesheet;

    try {
      // Try and get the Abstract Syntax Tree (AST) for the CSS string
      ast = css.parse(cssString);
    } catch (e) {
      this.cssParserError = e;
      return;
    }

    if (!ast.stylesheet) {
      throw new Error('The CSS contains no rules');
    }

    debugger;

    const rules: Rule[] = ast.stylesheet.rules.filter(x => (x as Rule).selectors !== undefined);
    const cssSelectors: CssSelector[] = [];

    for (const rule of rules) {
      for (const selector of rule.selectors ?? []) {
        cssSelectors.push({
          selector: selector,
          line: rule.position?.start?.line ?? 0,
          resultType: ResultType.error,
          messages: [Message.createForError('Test')]
        })
      }
    }

    // const cssSelectors2: CssSelector[] = rules
    //  .map(rule => rule.selectors ?? [].map(selector => ({
    //    selector: selector,
    //    line: rule.position?.start?.line ?? 0,
    //    resultType: ResultType.error,
    //    messages: [Message.createForError('Test')]
    //  })));

     // .map((selector, rule) => ({
     //   selector: selector,
     //   line: rule.position?.start?.line ?? 0,
     //   resultType: ResultType.error,
     //   messages: [Message.createForError('Test')]
     // }));


    // const cssSelectors: CssSelector[] = rules.map(x => {
    //   selector
    // } as CssSelector);

    debugger;

    console.dir(cssSelectors);




  }

  // private isRule(rule: Rule | Comment | AtRule): rule is Rule {
  //   return (rule as Rule).selectors !== undefined;
  // }


}
</script>

<style lang="scss">
  html {
    box-sizing: border-box;

    @media screen and (min-width: 500px) {
      font-size: 110%;
    }

    @media screen and (min-width: 550px) {
      font-size: 120%;
    }

    @media screen and (min-height: 500px) and (min-width: 500px) {
      padding-top: 1.5rem;
    }
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 1rem;

    font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333333;
  }

  .app__main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .app__input-label {
    display: block;
    margin-bottom: 0.4rem;
    font-weight: bold;
  }

  .app__input {
    padding: 0.6rem;
    border: 1px solid #C8CACC;
    border-radius: 4px;
    width: 100%;
    background-color: #F5F6F8;
    font-size: inherit;
  }

</style>


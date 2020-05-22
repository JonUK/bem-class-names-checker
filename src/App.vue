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
      </div>
    </div>

    <bem-parts :bem-parts="bemParts"></bem-parts>

    <display-messages :messages="messages"></display-messages>

    <site-footer></site-footer>

  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import ClassNameValidator from '@/utils/classNameValidator';
  import BemPartsValidator from '@/utils/bemPartsValidator';
  import BemClassNameParser from '@/utils/bemClassNameParser';

  import Message from '@/models/message';
  import MessageType from "@/enums/messageType";
  import BemPart from '@/models/bemPart';

  import SiteHeader from '@/components/SiteHeader.vue';
  import SiteFooter from '@/components/SiteFooter.vue';
  import BemParts from '@/components/BemParts.vue';
  import DisplayMessages from '@/components/DisplayMessages.vue';


@Component({
  components: {
    SiteHeader,
    SiteFooter,
    BemParts,
    DisplayMessages
  },
})
export default class App extends Vue {
  className = 'product-card__title--active';

  messages: Message[] = [];
  bemParts: BemPart[] = [];

  @Watch('className', { immediate: true } )
  onClassNameChanged(value: string) {
    this.processClassName(value);
  }

  private processClassName(className: string): void {
    const messages = ClassNameValidator.validate(className);
    const containsCriticalIssues = messages.some(x => x.messageType === MessageType.critical);

    this.bemParts = containsCriticalIssues ? [] : BemClassNameParser.parse(className);
    console.dir(this.bemParts);

    if (!containsCriticalIssues) {
      messages.push(...BemPartsValidator.validate(this.bemParts));
    }

    this.messages = messages;
  }
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
      padding-top: 10vh;
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


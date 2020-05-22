import BemPartType from "@/models/bemPartType";
<template>
  <div id="app">

    <div class="app__main-container">
      <div>
        <site-header :class-name="className"></site-header>

        <label for="className" style="display: block; font-weight: bold;">CSS class name</label>
        <input v-model="className" id="className" type="text" style="width: 100%">
      </div>
    </div>

    <bem-parts :bem-parts="bemParts"></bem-parts>

<!--    <pre>-->
<!--      <code>-->
<!--        {{ JSON.stringify(bemParts) }}-->
<!--      </code>-->
<!--    </pre>-->

    <ul>
      <li v-for="message in messages" :key="message.text">
        {{ message.messageType }} - {{ message.text }}
      </li>
    </ul>

  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import ClassNameValidator from '@/classNameValidator';
  import BemClassNameParser from '@/bemClassNameParser';
  import Message from '@/models/message';
  import MessageType from "@/enums/messageType";
  import BemPartType from './enums/bemPartType';
  import BemPart from '@/models/bemPart';

  import SiteHeader from '@/components/SiteHeader.vue';
  import BemParts from '@/components/BemParts.vue';

@Component({
  components: {
    SiteHeader,
    BemParts
  },
})
export default class App extends Vue {
  className = 'card__title--active';

  messages: Message[] = [];
  bemParts: BemPart[] = [];

  // Make the enum available for the view to use
  BemPartType = BemPartType;

  @Watch('className', { immediate: true } )
  onClassNameChanged(value: string) {
    this.processClassName(value);
  }

  private processClassName(className: string): void {
    const messages = ClassNameValidator.validate(className);
    const containsCriticalIssues = messages.some(x => x.messageType === MessageType.critical);

    this.messages = messages;
    this.bemParts = containsCriticalIssues ? [] : BemClassNameParser.parse(className)
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
    color: #000000d6;
  }

  .app__main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /*.header--container {*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*  align-items: center;*/
  /*}*/


  input {
    padding: 0.6rem;
    background-color: #F5F6F8;
    border-radius: 4px;
    border: 1px solid #C8CACC;

    font-size: inherit;
  }

  #app {
    //margin-top: 10vh;
    // text-align: center;
    // color: #2c3e50;

  }

  h1 {
    font-size: 1.8rem;
  }

</style>

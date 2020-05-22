import BemPartType from "@/models/bemPartType";
<template>
  <div id="app">

    <div style="display: flex; flex-direction: column; align-items: center; xxxbackground-color: cornsilk;">

      <div style="xxxbackground-color: aqua">
        <h1 style="margin-bottom: 0;">BEM Class Name Checker</h1>
        <p style="margin-top: 0; font-size: 1.2rem">Check for common BEM class name issues</p>

        <label for="className" style="display: block; font-weight: bold;">CSS class name</label>
        <input v-model="className" id="className" type="text" style="width: 100%">


      </div>

    </div>

    <br />
    <br />

    <div style="display: flex; justify-content: center; margin-right: 1rem;">
      <template v-for="part in bemParts">

        <bem-part-separator
          :bem-part-type="part.partType"
          :key="part.id + '-separator'"
        ></bem-part-separator>

        <bem-part-value
          :bem-part-type="part.partType"
          :value="part.value"
          :key="part.id + '-value'"
        ></bem-part-value>

      </template>
    </div>

    <pre>
      <code>
        {{ JSON.stringify(bemModel) }}
      </code>
    </pre>

    <ul>
      <li v-for="issue in validationIssues" :key="issue.message">{{ issue.message }}</li>
    </ul>

  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { v4 as uuidv4 } from 'uuid';

  import ClassNameValidator from '@/classNameValidator';
  import BemClassNameParser from '@/bemClassNameParser';
  import ValidationIssue from '@/models/validationIssue';
  import ValidationErrorSeverity from "@/models/validationErrorSeverity";
  import BemPartType from './models/bemPartType';
  import BemPart from '@/models/bemPart';

  import BemPartSeparator from '@/components/BemPartSeparator.vue';
  import BemPartValue from '@/components/BemPartValue.vue';

  @Component({
  components: {
    BemPartSeparator,
    BemPartValue
  },
})
export default class App extends Vue {
  className = 'card__title--active';

  validationIssues: ValidationIssue[] = [];
  bemModel: BemModel | null = null;

  bemParts: BemPart[] = [
    { id: uuidv4(), partType: BemPartType.block, value: 'card' },
    { id: uuidv4(), partType: BemPartType.element, value: 'title' },
    { id: uuidv4(), partType: BemPartType.modifier, value: 'active' }
  ];

  // Make the enum available for the view to use
  BemPartType = BemPartType;

  @Watch('className', { immediate: true } )
  onClassNameChanged(value: string) {
    this.processClassName(value);
  }

  private processClassName(className: string): void {
    const validationIssues = ClassNameValidator.validate(className);
    const containsCriticalIssues = validationIssues.some(x => x.severity === ValidationErrorSeverity.Critical);

    this.validationIssues = validationIssues;
    this.bemModel = containsCriticalIssues ? null : BemClassNameParser.parse(className)
  }

}
</script>

<style lang="scss">
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000000d6;
  }

  input {
    padding: 0.6rem;
    background-color: #F5F6F8;
    border-radius: 4px;
    border: 1px solid #C8CACC;

    font-size: inherit;
  }

  #app {
    margin-top: 10vh;
    // text-align: center;
    // color: #2c3e50;

  }

  h1 {
    font-size: 2rem;
  }

</style>

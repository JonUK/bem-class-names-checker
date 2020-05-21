import ValidationErrorSeverity from "@/models/validationErrorSeverity";
<template>
  <div id="app">
    <h1>BEM Class Name Checker</h1>

    <label>
      CSS class name <input v-model="className" type="text">
    </label>

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
  import ClassNameValidator from '@/classNameValidator';
  import BemClassNameParser from '@/bemClassNameParser';
  import ValidationIssue from "@/models/validationIssue";
  import ValidationErrorSeverity from "@/models/validationErrorSeverity";

  import HelloWorld from './components/HelloWorld.vue';

  @Component({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {
  className = 'card__title--active';

  validationIssues: ValidationIssue[] = [];
  bemModel: BemModel | null = null;

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

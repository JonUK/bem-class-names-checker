<template>

  <div>
    <span class="label"
          :class="{ 'stylesheet-input__label--error': stylesheetParserError !== null }"
    >
      CSS Stylesheet
    </span>

    <div class="stylesheet-input__container"
         :class="{ 'stylesheet-input__container--error': stylesheetParserError !== null }">
      <codemirror
        v-model="internalStylesheetString"
        :options="options"
      ></codemirror>
    </div>

  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import CodeMirror from 'codemirror';

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  import { codemirror } from 'vue-codemirror-lite';
  import { ParserError } from 'css';

  require('codemirror/mode/css/css.js');
  require('codemirror/addon/hint/show-hint.js');
  require('codemirror/addon/hint/show-hint.css');
  require('codemirror/addon/hint/css-hint.js');

  @Component({
    components: {
      codemirror
    }
  })
  export default class StylesheetInput extends Vue {
    @Prop({ type: String, required: true }) stylesheetString!: string;
    @Prop({ type: Error, default: null}) stylesheetParserError!: ParserError;

    options: CodeMirror.EditorConfiguration = {
      mode: 'css',
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true,
      extraKeys: {'Ctrl-Space': 'autocomplete'},
      screenReaderLabel: 'CSS Stylesheet'
    };

    // Computed prop used so we don't mutate the parent prop
    get internalStylesheetString() {
      return this.stylesheetString;
    }
    set internalStylesheetString(value) {
      this.$emit('update:stylesheetString', value)
    }
  }
</script>

<style lang="scss">
  .CodeMirror {
    height: 38vh;
  }

  .CodeMirror-code {
    font-family: 'Inconsolata', monospace;
  }

  .stylesheet-input__container {
    border: 2px solid #D2D2D2;
  }

  .stylesheet-input__container--error {
    border-color: #DD6666;
  }

  .stylesheet-input__label--error {
    color: #BB0000;
  }
</style>

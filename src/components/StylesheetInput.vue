<template>

  <div>
    <label for="stylesheetString"
           :class="{ 'stylesheet-input__label--error': stylesheetParserError !== null }"
           class="label"
    >
      CSS Stylesheet
    </label>
    <textarea
      id="stylesheetString"
      v-model="internalStylesheetString"
      :class="{ 'stylesheet-input__input--error': stylesheetParserError !== null }"
      class="stylesheet-input__input "
      cols="25"
      rows="5"
      autocomplete="on"
      spellcheck="false"
    ></textarea>

  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { ParserError } from 'css';

  @Component
  export default class StylesheetInput extends Vue {
    @Prop({ type: String, required: true }) stylesheetString!: string;
    @Prop({ type: Error, default: null}) stylesheetParserError!: ParserError;

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
  .stylesheet-input__input {
    height: 38vh;
    // min-height: 15rem;
    // max-height: 25rem;
    font-size: 0.85rem;
    border: 2px solid #D2D2D2;
    resize: vertical;

    @media screen and (min-width: 30rem) {
      font-size: 0.9rem;
    }

    @media screen and (min-width: 48rem) {
      font-size: 1rem;
    }
  }

  .stylesheet-input__input--error {
    border-color: #DD6666;
  }

  .stylesheet-input__input--error:focus {
    outline-color: #DD6666;
  }

  .stylesheet-input__label--error {
    color: #BB0000;
  }
</style>

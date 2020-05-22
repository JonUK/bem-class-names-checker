<template>

  <div>
    <h1 class="site-header__title">BEM Class Name Checker</h1>
    <p class="site-header__lead">Check for common BEM class name issues</p>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SiteHeader extends Vue {
  @Prop({ type: String, required: true }) className!: string;
}
</script>

<style lang="scss">
  .site-header__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .site-header__title {
    margin: 0;
    font-size: 1.8rem;
  }

  .site-header__lead {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: 1.2rem
  }

  .site-header__input {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: 1.2rem
  }
</style>

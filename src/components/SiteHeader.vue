<template>

  <header class="site-header">
    <h1 class="site-header__title">BEM Class Name Checker</h1>
    <p class="site-header__lead">Check for common BEM class name issues</p>
  </header>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SiteHeader extends Vue {
}
</script>

<style lang="scss">
  .site-header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .site-header__title {
    margin: 0;
    font-size: 1.7rem;
  }

  .site-header__lead {
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 1.04rem;
    font-weight: 300;
  }

  @media screen and (min-width: 25rem) {
    .site-header__title {
      font-size: 1.8rem;
    }

    .site-header__lead {
      font-size: 1.1rem;
    }
  }
</style>

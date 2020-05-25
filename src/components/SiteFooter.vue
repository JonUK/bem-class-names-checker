<template>

  <footer class="site__footer">

    <h2 class="site__heading">GitHub Repo</h2>
    <a href="https://github.com/JonUK/bem-class-name-checker" target="_blank">https://github.com/JonUK/bem-class-name-checker</a>

    <h2 class="site__heading">Brought to you by</h2>
    Jon Keeping &mdash;
    <a href="https://keepinguptodate.com" target="_blank">keepinguptodate.com</a>
  </footer>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SiteFooter extends Vue {
}
</script>

<style lang="scss">
 .site__footer {
   margin-top: 3.5rem;
   font-size: 16px
 }

 .site__heading {
   margin-top: 2rem;
   margin-bottom: 0.5rem;
   font-size: 1.4rem;
   font-weight: 500;
 }
</style>

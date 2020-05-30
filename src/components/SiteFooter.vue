<template>

  <footer class="site-footer">

    <div class="site-footer__section">
      <h2 class="site-footer__heading">What is this site?</h2>
      <p>BEM Class Names Checker is an online tool to check if BEM class names are valid and check them for common naming issues.</p>
      <p>The BEM (Block, Element, Modifier) methodology for naming CSS styles lends itself well for large websites composed of lots of independent modules but can be confusing until you are familiar with it.</p>
      <p>I hope this online tool will help as a way of experimenting with BEM as well as validating existing stylesheets.</p>
    </div>

    <div class="site-footer__section">
      <h2 class="site-footer__heading">GitHub repo</h2>
      <p>
        <a href="https://github.com/JonUK/bem-class-names-checker" target="_blank">https://github.com/JonUK/bem-class-names-checker</a>
      </p>

      <p>Website written in TypeScript and uses Vue.js.</p>


      <h2 class="site-footer__heading">Brought to you by</h2>
      Jon Keeping &mdash;
      <a href="https://keepinguptodate.com" target="_blank">keepinguptodate.com</a>
    </div>

  </footer>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SiteFooter extends Vue {
}
</script>

<style lang="scss">
 .site-footer {
   display: flex;
   flex-wrap: wrap;
   margin-top: 2.5rem;
 }

 .site-footer__section {
   width: 100%;
 }

 @media screen and (min-width: 54rem) {
   .site-footer__section {
     width: 50%;
   }

   .site-footer__section + .site-footer__section {
     padding-left: 3rem;
   }
 }

 .site-footer__heading {
   margin-top: 2rem;
   margin-bottom: 0.6rem;
   font-size: 1.4rem;
   font-weight: 500;
 }

 .site-footer__heading + p {
   margin-top: 0.6rem;
 }

</style>

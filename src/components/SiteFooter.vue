<template>

  <div class="site__footer">
    <h2 class="site__heading">Brought to you by</h2>
    Jon Keeping &mdash;
    <a href="https://keepinguptodate.com" target="_blank">keepinguptodate.com</a>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SiteFooter extends Vue {
}
</script>

<style lang="scss">
 .site__footer {
   position: absolute;
   bottom: 10px;
   font-size: 16px
 }

 .site__heading {
   margin: 0;
   font-size: inherit;
 }
</style>

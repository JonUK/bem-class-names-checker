<template>

  <div class="bem-part-separator__container">
    <div class="bem-part-separator__text">
      <template v-if="bemPartType === BemPartType.block">.</template>
      <template v-else-if="bemPartType === BemPartType.element">__</template>
      <template v-else>--</template>
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BemPartType from "@/enums/bemPartType";

@Component
export default class BemPartSeparator extends Vue {
  @Prop({ type: String, required: true }) bemPartType!: BemPartType;

  // Make the enum available for the view to use
  BemPartType = BemPartType;
}
</script>

<style lang="scss" scoped>

  .bem-part-separator__container {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0.3rem;
  }
  .bem-part-separator__text {
    margin-top: 1.75rem;
    font-family: 'Space Mono', monospace;
    font-size: 1.2rem;
    text-align: center;
    color: #AA5D00;
  }

</style>

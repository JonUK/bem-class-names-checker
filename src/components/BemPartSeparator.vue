<template>

  <div style="margin: 0 0.3rem; display: flex; flex-direction: column;">
    <div style="margin-bottom: 0.5rem; text-align: center; border-top: 1px solid transparent; border-left: 1px solid transparent; border-right: 1px solid transparent;">
      <span style="font-size: 0.85rem; padding: 0 0.2rem;">&nbsp;</span>
    </div>
    <div style="font-size: 1.4rem; text-align: center; color: #AA5D00;">

      <template v-if="bemPartType === BemPartType.block">.</template>
      <template v-else-if="bemPartType === BemPartType.element">__</template>
      <template v-else>--</template>

    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BemPartType from "@/models/bemPartType";

@Component
export default class BemPartSeparator extends Vue {
  @Prop({ type: Number, required: true }) bemPartType!: BemPartType;

  // Make the enum available for the view to use
  BemPartType = BemPartType;
}
</script>

<style lang="scss" scoped>

</style>

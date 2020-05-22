<template>

  <div style="display: flex; flex-direction: column;">
    <div style="padding: 0 0.2rem; margin-bottom: 0.5rem; text-align: center; border-top: 1px solid #999999; border-left: 1px solid #999999; border-right: 1px solid #999999;">
      <span style="position: relative; top: -0.7rem; font-size: 0.85rem; background-color: white; padding: 0 0.2rem;">

        <template v-if="bemPartType === BemPartType.block">Block</template>
        <template v-else-if="bemPartType === BemPartType.element">Element</template>
        <template v-else>Modifier</template>

      </span>
    </div>
    <div style="font-size: 1.4rem; text-align: center; color: #AA5D00;">
      {{ value }}
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BemPartType from '@/models/bemPartType';

@Component
export default class BemPartValue extends Vue {
  @Prop({ type: Number, required: true }) bemPartType!: BemPartType;
  @Prop({ type: String, required: true,  }) value!: string;

  // Make the enum available for the view to use
  BemPartType = BemPartType;
}
</script>

<style lang="scss" scoped>

</style>

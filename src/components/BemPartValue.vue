<template>

  <div class="bem-part-value__container">
    <div class="bem-part-value__label">
      <span class="bem-part-value__label-text">

        <template v-if="bemPartType === BemPartType.block">Block</template>
        <template v-else-if="bemPartType === BemPartType.element">Element</template>
        <template v-else>Modifier</template>

      </span>
    </div>
    <div class="bem-part-value__text">
      {{ value }}
    </div>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BemPartType from '@/enums/bemPartType';

@Component
export default class BemPartValue extends Vue {
  @Prop({ type: String, required: true }) bemPartType!: BemPartType;
  @Prop({ type: String, required: true,  }) value!: string;

  // Make the enum available for the view to use
  BemPartType = BemPartType;
}
</script>

<style lang="scss">

  .bem-part-value__container {
    display: flex;
    flex-direction: column;
    margin: 0.8rem 0.3rem;
  }

  .bem-part-value__label {
    padding: 0 0.2rem;
    margin-bottom: 0.5rem;
    text-align: center;
    border-top: 1px solid #999999;
    border-left: 1px solid #999999;
    border-right: 1px solid #999999;
  }

  .bem-part-value__label-text {
    position: relative;
    top: -0.7rem;
    padding: 0 0.2rem;
    font-size: 0.85rem;
    background-color: white;
  }

  .bem-part-value__text {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.2rem;
    text-align: center;
    color: #AA5D00;
  }

</style>

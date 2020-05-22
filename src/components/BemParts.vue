<template>

  <div style="display: flex; flex-wrap: wrap; justify-content: center; margin-right: 1rem; margin-top: 2rem;">
    <template v-for="part in bemParts">

      <bem-part-separator
        :bem-part-type="part.partType"
        :key="part.id + '-separator'"
      ></bem-part-separator>

      <bem-part-value
        :bem-part-type="part.partType"
        :value="part.value"
        :key="part.id + '-value'"
      ></bem-part-value>

    </template>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BemPart from '@/models/bemPart';
import BemPartSeparator from '@/components/BemPartSeparator.vue';
import BemPartValue from '@/components/BemPartValue.vue';

@Component({
  components: {
    BemPartSeparator,
    BemPartValue,
  },
})
export default class BemParts extends Vue {
  @Prop({ type: Array, required: true }) bemParts!: BemPart[];
}
</script>

<style lang="scss" scoped>

</style>

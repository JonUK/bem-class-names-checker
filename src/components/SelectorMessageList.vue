<template>

  <div>

    <strong id="messages" class="label">Messages ({{ selectorMessages.length }})</strong>

    <div class="selector-message-list" tabindex="0" aria-labelledby="messages">
      <table class="selector-message-list__table">
        <thead>
        <tr>
          <th width="4%"></th>
          <th width="22%">Selector</th>
          <th width="4%">Line</th>
          <th width="70%">Description</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="selectorMessage in selectorMessages">
          <selector-message-item
            :key="selectorMessage.selector + selectorMessage.line"
            :selector-message="selectorMessage"></selector-message-item
          >
        </template>

        </tbody>

      </table>

    </div>

  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import SelectorMessage from '@/models/selectorMessage';
  import SelectorMessageItem from '@/components/SelectorMessageItem.vue';

  @Component({
    components: {SelectorMessageItem}
  })
  export default class SelectorMessageList extends Vue {
    @Prop({type: Array, required: true}) selectorMessages!: SelectorMessage[];
  }
</script>

<style lang="scss">

  .selector-message-list {
    max-height: 38vh;
    border: 2px solid #D2D2D2;
    overflow: auto;
    resize: vertical;
  }

  .selector-message-list__table {
    border-collapse: collapse;
    width: 100%;
  }

  .selector-message-list__table th,
  .selector-message-list__table td {
    border: 1px solid #D8D8D8;
  }

  .selector-message-list__table th {
    position: sticky;
    top: 0;
    padding: 12px 8px;
    background-color: #0F79CF;
    color: white;
  }

  .selector-message-list__table td {
    padding: 8px;
  }

  .selector-message-list__table tr:nth-child(even) {
    background-color: #F8F8F8;
  }

  // TODO: Review putting the hover style back in if selecting a row is supported in future
  // .selector-messages__table tr:hover {
  //   background-color: #E8F7FE;
  // }

  .selector-message-list__table tr td:first-child {
    border-left: 0;
  }
  .selector-message-list__table tr:last-child td {
    border-bottom: 0;
  }
  .selector-message-list__table tr td:last-child {
    border-right: 0;
  }

  .selector-message-list__table th {
    border: 0;
    font-weight: 500;
  }

</style>

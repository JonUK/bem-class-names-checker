<template>

  <tr class="selector-message-item">
    <td class="selector-message-item__icon-container">
      <img :src="iconSource"
           :alt="iconAltText"
           width="20"
           height="20"
           class="selector-message-item__icon" >
    </td>
    <td class="selector-message-item__selector">{{ selectorMessage.selector }}</td>
    <td>{{ selectorMessage.line }}</td>
    <td>{{ selectorMessage.message }}</td>
  </tr>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import SelectorMessage from '@/models/selectorMessage';
  import MessageType from '@/enums/messageType';

  import iconError from '@/assets/images/icon-error.svg';
  import iconWarning from '@/assets/images/icon-warning.svg';
  import iconInfo from '@/assets/images/icon-info.svg';
  import iconOk from '@/assets/images/icon-ok.svg';

  @Component
  export default class SelectorMessageItem extends Vue {
    @Prop({type: Object, required: true}) selectorMessage!: SelectorMessage;

    get iconSource() {
      switch (this.selectorMessage.messageType) {
        case MessageType.warning:
          return iconWarning;
        case MessageType.info:
          return iconInfo;
        case MessageType.success:
          return iconOk;
        default:
          return iconError;
      }
    }

    get iconAltText(): string {
      switch (this.selectorMessage.messageType) {
        case MessageType.warning:
          return 'Warning';
        case MessageType.info:
          return 'Information';
        case MessageType.success:
          return 'Success';
        default:
          return 'Error';
      }
    }
  }
</script>

<style lang="scss">

  .selector-message-item {
    font-size: 0.8rem;

    @media screen and (min-width: 30rem) {
      font-size: 0.9rem;
    }

    @media screen and (min-width: 48rem) {
      font-size: 1rem;
    }
  }

  tr td.selector-message-item__icon-container { // Made more specific to override td style
    padding: 6px 8px;
  }

  .selector-message-item__icon {
    @media screen and (min-width: 30rem) {
      width: 22px;
      height: 22px;
    }

    @media screen and (min-width: 48rem) {
      width: 24px;
      height: 24px;
    }
  }

  .selector-message-item__selector {
    word-break: break-word;
  }

</style>


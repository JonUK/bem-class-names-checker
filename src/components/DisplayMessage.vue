<template>

  <li :class="'display-message__' + message.messageType" class="display-message">
    <strong>

      <template v-if="message.messageType === MessageType.success">
        Success
      </template>
      <template v-else-if="message.messageType === MessageType.warning">
        Warning
      </template>
      <template v-else>
        Error
      </template>

    </strong>
    <br />

    {{ message.text }}
  </li>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Message from '@/models/message';
import MessageType from '@/enums/messageType';

@Component
export default class DisplayMessage extends Vue {
  @Prop({ type: Object, required: true }) message!: Message;

  // Make the enum available for the view to use
  MessageType = MessageType;
}
</script>

<style lang="scss">

  .display-message {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0.75rem 1rem;
    border: 1px solid transparent;
    border-radius: 4px;
  }

  .display-message__critical,
  .display-message__error {
    border-color: #ECA3AB;
    background-color: #FFF2F2;
  }

  .display-message__warning {
    border-color: #EEBA88;
    background-color: #FFF5EA;
  }

  .display-message__success {
    border-color: #AEC590;
    background-color: #F4F8EE;
  }

</style>

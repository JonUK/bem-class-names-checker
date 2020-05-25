<template>

  <div class="display-messages__container">

    <h2 v-if="issues.length" class="display-messages__heading">
      Issues ({{ issues.length }})
    </h2>

    <ul v-for="message in displayMessages" :key="message.id" class="display-messages">
      <display-message :message="message"></display-message>
    </ul>
  </div>

</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Message from '@/models/message';
  import MessageType from '@/enums/messageType';
  import DisplayMessage from '@/components/DisplayMessage.vue';

  @Component({
  components: {DisplayMessage}
})
export default class DisplayMessages extends Vue {
  @Prop({ type: Array, required: true }) messages!: Message[];

  get issues(): Message[] {
    return this.messages.filter(x =>
      x.messageType === MessageType.critical ||
      x.messageType === MessageType.error ||
      x.messageType === MessageType.warning)
  }

  get displayMessages(): Message[] {
    const issues = this.issues;

    if (issues.length) {
      return issues;
    }

    return [Message.createForSuccess('This is a valid BEM class name')];
  }
}
</script>

<style lang="scss">

  .display-messages__container {
    margin: 0 auto;
    max-width: 500px;
  }

  .display-messages {
    padding: 0;
    list-style: none;
  }

  .display-messages__heading {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

</style>

import MessageType from "@/enums/messageType";

export default class Message {

  static createForCritical(text: string) {
    return new Message(text, MessageType.critical);
  }

  static createForError(text: string) {
    return new Message(text, MessageType.error);
  }

  static createForWarning(text: string) {
    return new Message(text, MessageType.warning);
  }

  static createForSuccess(text: string) {
    return new Message(text, MessageType.success);
  }

  private constructor(public text: string, public messageType: MessageType) {
  }
}

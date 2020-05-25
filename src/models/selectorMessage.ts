import MessageType from "@/enums/messageType";

export default interface SelectorMessage {
  selector: string;
  line: number;
  message: string;
  messageType: MessageType
}

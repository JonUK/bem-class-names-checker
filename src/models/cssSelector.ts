import ResultType from '@/enums/resultType';
import Message from '@/models/message';

export default interface CssSelector {
  selector: string;
  line: number;
  resultType: ResultType;
  messages: Message[];
}

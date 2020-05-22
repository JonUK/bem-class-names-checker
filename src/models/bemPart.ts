import BemPartType from '@/enums/bemPartType';

export default interface BemPart {
  id: string;
  partType: BemPartType;
  value: string;
}

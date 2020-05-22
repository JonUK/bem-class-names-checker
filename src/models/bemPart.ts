import BemPartType from '@/models/bemPartType';

export default interface BemPart {
  id: string;
  partType: BemPartType;
  value: string;
}

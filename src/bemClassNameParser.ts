import { v4 as uuidv4 } from 'uuid';
import BemPart from "@/models/bemPart";
import BemPartType from "@/enums/bemPartType";

// --------------------------------------------------------------------------------

export default class BemClassNameParser {
  static parse(className: string): BemPart[] {

    className = className.trim();

    // If the there's a dot prefix, strip it out so it's not part of the class name
    if (className && className.substring(0, 1) === '.') {
      className = className.substring(1);
    }

    const separatorsRegExp = /(__|--)/;
    const containsSeparators = separatorsRegExp.test(className);
    const bemParts: BemPart[] = [];

    if (!containsSeparators) {
      bemParts.push({ id: uuidv4(), partType: BemPartType.block, value: className });
      return bemParts;
    }

    const parts = className.split(separatorsRegExp);

    if (!parts) {
      throw new Error('No element or modifier separators were found');
    }

    bemParts.push({ id: uuidv4(), partType: BemPartType.block, value: parts[0] });

    for (let i = 1; i < parts.length; i = i + 2) {
      const separator = parts[i];
      const partName = parts[i + 1];
      const partType = separator === '__' ?  BemPartType.element : BemPartType.modifier;

      bemParts.push({ id: uuidv4(), partType: partType, value: partName });
    }

    return bemParts;
  }
}


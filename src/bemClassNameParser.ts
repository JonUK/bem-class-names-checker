export default class BemClassNameParser {
  static parse(className: string): BemModel {

    // --------------------------------------------------------------------------------

    const separatorsRegExp = /(__|--)/;
    const containsSeparators = separatorsRegExp.test(className);

    if (!containsSeparators) {
      return {
        block: className || null, // Return an empty string as null
        elements: [],
        modifiers: []
      };
    }

    const parts = className.split(/(__|--)/);

    if (!parts) {
      throw new Error('No element or modifier separators were found');
    }

    for (const part of parts) {
      console.log(part);
    }

    const block = parts[0];
    const elements: (string | null)[] = [];
    const modifiers: (string | null)[] = [];

    for (let i = 1; i < parts.length; i = i + 2) {
      const separator = parts[i];
      const partName = parts[i + 1];

      if (separator === '__') {
        elements.push(partName);
      } else {
        modifiers.push(partName);
      }
    }

    return {
      block: block,
      elements: elements,
      modifiers: modifiers
    };
  }
}


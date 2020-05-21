export default class ClassNameParser {
  static parse(className: string): BemModel {

    // --------------------------------------------------------------------------------

    // const separatorsRegExp = /[a-z\d]+(__|--)/;
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

    // // Match each part of the BEM class name including the separators
    // const partsRegExp = /([\w\d]+)(__|--)([\w\d]*)/;
    // // const partsRegExp2 = new RegExp('([\\w\\d]+)(__|--)([\\w\\d]*)', )
    // const partsMatches = className.match(partsRegExp);
    //
    // if (partsMatches === null) {
    //   return {
    //     block: className || null, // Return an empty string as null
    //     elements: [],
    //     modifiers: []
    //   };
    // }
    //
    // for (const part of partsMatches) {
    //   console.log(part);
    // }
    //
    //
    // let element = null;
    // let modifier = null;
    // let lastSeparatorType = null;
    //
    // for (let i = 2; i < partsMatches.length; i++) {
    //   const part = partsMatches[i];
    //
    //   if (part === '__') {
    //     lastSeparatorType = SeparatorType.Element;
    //     continue;
    //   } else if (part === '--') {
    //     lastSeparatorType = SeparatorType.Modifier;
    //     continue;
    //   }
    //
    //   if (lastSeparatorType === SeparatorType.Element) {
    //     elements.push(part);
    //   } else if (lastSeparatorType === SeparatorType.Modifier) {
    //     modifiers.push(part);
    //   }
    // }



  }
}


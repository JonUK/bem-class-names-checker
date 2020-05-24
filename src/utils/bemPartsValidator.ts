import Message from '@/models/message';
import BemPart from '@/models/bemPart';
import BemPartType from '@/enums/bemPartType';

// --------------------------------------------------------------------------------

/**
 * The responsibility of this class is to check the BEM parts are valid.
 */
export default class BemPartsValidator {
  static validate(bemParts: BemPart[]): Message[] {
    const messages: Message[] = [];

    // This class method is always passed the block as the first item
    const block = bemParts[0].value;
    const elements = bemParts.filter(x => x.partType === BemPartType.element);

    if (elements.length === 1) {
      const element = elements[0].value;
      const endsWithHyphenOrUnderscore = element.endsWith('-') || element.endsWith('_');

      if (!element) {
        messages.push(Message.createForError('An element separator has been used but no element entered.'));
      }

      if (endsWithHyphenOrUnderscore) {
        messages.push(Message.createForWarning('The element ends with a hyphen or an underscore.'));
      }

      if (element.match(new RegExp(block, 'i'))) {
        messages.push(Message.createForWarning(`The element contains the block name "${block}".`));
      }

    } else if (elements.length == 2) {
      messages.push(Message.createForWarning(
        `The element "${elements[1].value}" is nested in the element "${elements[0].value}". 
        BEM class names typically have at most 1 element.`))
    } else if (elements.length > 1) {
      messages.push(Message.createForError(`There are ${elements.length} elements.`))
    }

    const modifiers = bemParts.filter(x => x.partType === BemPartType.modifier);

    if (modifiers.length === 1) {
      const modifier = modifiers[0].value;
      const endsWithHyphenOrUnderscore = modifier.endsWith('-') || modifier.endsWith('_');

      if (!modifier) {
        messages.push(Message.createForError('An element separator has been used but no modifier entered.'));
      }

      if (endsWithHyphenOrUnderscore) {
        messages.push(Message.createForWarning(`The modifier ends with a hyphen or an underscore.`));
      }

      if (modifier.match(new RegExp(block, 'i'))) {
        messages.push(Message.createForWarning(`The modifier contains the block name "${block}".`));
      }

    } else if (modifiers.length > 1) {
      messages.push(Message.createForError(`There are ${modifiers.length} modifiers. BEM class names can have at most 1 modifier.`))
    }

    if (elements.length === 1 && modifiers.length === 1) {
      if (bemParts[1].partType === BemPartType.modifier) {
        messages.push(Message.createForError(`The element "${bemParts[2].value}" appears after the modifier "${bemParts[1].value}" which is invalid.`))
      }
    }

    return messages;
  }
}

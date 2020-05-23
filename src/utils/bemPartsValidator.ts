import Message from '@/models/message';
import BemPart from "@/models/bemPart";
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

      if (endsWithHyphenOrUnderscore) {
        messages.push(Message.createForWarning(`The element ends with a hyphen or an underscore.`));
      }

      if (element.includes(block)) {
        messages.push(Message.createForWarning(`The element contains the block name "${block}".`));
      }

    } else if (elements.length == 2) {
      messages.push(Message.createForWarning(`There is a nested element. BEM class names typically have at most 1 element.`))
    } else if (elements.length > 1) {
      messages.push(Message.createForError(`There are ${elements.length} elements.`))
    }

    const modifiers = bemParts.filter(x => x.partType === BemPartType.modifier);

    if (modifiers.length === 1) {
      const modifier = modifiers[0].value;
      const endsWithHyphenOrUnderscore = modifier.endsWith('-') || modifier.endsWith('_');

      if (endsWithHyphenOrUnderscore) {
        messages.push(Message.createForWarning(`The modifier ends with a hyphen or an underscore.`));
      }

      if (modifier.includes(block)) {
        messages.push(Message.createForWarning(`The modifier contains the block name "${block}".`));
      }

    } else if (modifiers.length > 1) {
      messages.push(Message.createForError(`There are ${modifiers.length} modifiers. BEM class names can have at most 1 modifier.`))
    }

    return messages;
  }



}

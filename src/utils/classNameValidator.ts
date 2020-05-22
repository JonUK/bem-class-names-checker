import Message from '@/models/message';

// --------------------------------------------------------------------------------

/**
 * The responsibility of this class is to check that the overall CSS class name is a valid.
 */
export default class ClassNameValidator {
  static validate(className: string): Message[] {

    className = className.trim();

    // If the there's a dot prefix, strip it out as so it's not part of the class name
    if (className && className.substring(0, 1) === '.') {
      className = className.substring(1);
    }

    if (!className) {
      return [Message.createForCritical('No CSS class name has been entered.')];
    }

    const messages = [];

    const startsWith2Hyphens = /^--/;
    const startsWithAHyphenAndDigit = /^-\d/;
    const startsWithDigitRegExp = /^\d/;
    const startsWithVendorPrefixes = /^[-|_]/;
    const startsWithSomethingElse = /^[^a-z]/i;


    // Check the start of the class name
    if (className.substring(0, 1) === '#') {
      messages.push(Message.createForError('A CSS class name cannot start with "#". BEM uses class names only and not ID selectors.'));
    } else if (startsWith2Hyphens.test(className)) {
      messages.push(Message.createForCritical('The CSS class name starts with 2 hyphens which is invalid'));
    } else if (startsWithAHyphenAndDigit.test(className)) {
      messages.push(Message.createForCritical('The CSS class name starts with hyphen and a number which is invalid.'));
    } else if (startsWithDigitRegExp.test(className)) {
      messages.push(Message.createForCritical('The CSS class name starts with a number which is invalid.'));
    } else if (startsWithVendorPrefixes.test(className)) {
      messages.push(Message.createForWarning('The CSS class name starts with a hyphen or underscore which is typically reserved for browser vendors'));
    } else if (startsWithSomethingElse.test(className)) {
      messages.push(Message.createForCritical('The CSS class name does not start with a letter (a-z)'));
    }

    if (className.length < 2) {
      messages.push(Message.createForCritical('CSS class names must be at least 2 characters long.'));
    }

    const wordsSeparatedBySpaces = /\s/;
    if (wordsSeparatedBySpaces.test(className)) {
      messages.push(Message.createForCritical('The CSS class name contains spaces which is invalid'));
    } else if (className.length > 2) {
      // Check the rest of the class name after the first 2 characters
      const restOfClassName = className.substring(2);

      const remainingContainsValidCharacters = /^[_\-a-zA-Z0-9:]+$/;
      if (!remainingContainsValidCharacters.test(restOfClassName)) {
        messages.push(Message.createForCritical('The CSS class name contains invalid characters. After the first 2 characters, only numbers, letters, hyphens or underscores are allowed'));
      }
    }

    const wordsSeparatedByUnderscores = /[a-z]_[a-z]/i;
    if (wordsSeparatedByUnderscores.test(className)) {
      messages.push(Message.createForWarning('Words have been separated by underscores. BEM uses hyphens to separate words.'));
    }

    const containsUppercaseCharacters = /[A-Z]/;
    if (containsUppercaseCharacters.test(className)) {
      messages.push(Message.createForWarning('The CSS class name contains uppercase characters. BEM class names should only use lowercase characters.'));
    }

    return messages;
  }
}

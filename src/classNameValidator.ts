import ValidationIssue from '@/models/validationIssue';

// --------------------------------------------------------------------------------

/**
 * The responsibility of this class is to check that the overall CSS class name is a valid.
 */
export default class ClassNameValidator {
  static validate(className: string): ValidationIssue[] {

    className = className.trim();

    // If the there's a dot prefix, strip it out as so it's not part of the class name
    if (className && className.substring(0, 1) === '.') {
      className = className.substring(1);
    }

    if (!className) {
      return [ValidationIssue.createForCritical('No CSS class name has been entered.')];
    }

    const validationErrors = [];

    const startsWith2Hyphens = /^--/;
    const startsWithAHyphenAndDigit = /^-\d/;
    const startsWithDigitRegExp = /^\d/;
    const startsWithVendorPrefixes = /^[-|_]/;
    const startsWithSomethingElse = /^[^a-z]/i;


    // Check the start of the class name
    if (className.substring(0, 1) === '#') {
      validationErrors.push(ValidationIssue.createForError('A CSS class name cannot start with "#". BEM uses class names only and not ID selectors.'));
    } else if (startsWith2Hyphens.test(className)) {
      validationErrors.push(ValidationIssue.createForCritical('The CSS class name starts with 2 hyphens which is invalid'));
    } else if (startsWithAHyphenAndDigit.test(className)) {
      validationErrors.push(ValidationIssue.createForCritical('The CSS class name starts with hyphen and a number which is invalid.'));
    } else if (startsWithDigitRegExp.test(className)) {
      validationErrors.push(ValidationIssue.createForCritical('The CSS class name starts with a number which is invalid.'));
    } else if (startsWithVendorPrefixes.test(className)) {
      validationErrors.push(ValidationIssue.createForError('The CSS class name starts with a hyphen or underscore which is typically reserved for browser vendors'));
    } else if (startsWithSomethingElse.test(className)) {
      validationErrors.push(ValidationIssue.createForCritical('The CSS class name does not start with a letter (a-z)'));
    }

    const containsUppercaseCharacters = /[A-Z]/;
    if (containsUppercaseCharacters.test(className)) {
      validationErrors.push(ValidationIssue.createForError('The CSS class name contains uppercase characters. BEM class names should only user lowercase characters.'));
    }

    if (className.length < 2) {
      validationErrors.push(ValidationIssue.createForCritical('CSS class names must be at least 2 characters long.'));
    }

    const wordsSeparatedBySpaces = /\s/;
    if (wordsSeparatedBySpaces.test(className)) {
      validationErrors.push(ValidationIssue.createForCritical('The CSS class name contains spaces which is invalid'));
    } else if (className.length > 2) {
      // Check the rest of the class name after the first 2 characters
      const restOfClassName = className.substring(2);
      console.log('restOfClassName', restOfClassName);

      const remainingContainsValidCharacters = /^[_\-a-zA-Z0-9:]+$/;
      if (!remainingContainsValidCharacters.test(restOfClassName)) {
        validationErrors.push(ValidationIssue.createForCritical('The CSS class name contains invalid characters. After the first 2 characters, only numbers, letters, hyphens or underscores are allowed'));
      }
    }

    const wordsSeparatedByUnderscores = /[a-z]_[a-z]/i;
    if (wordsSeparatedByUnderscores.test(className)) {
      validationErrors.push(ValidationIssue.createForError('Words have been separated by underscores. BEM uses hyphens to separate words.'));
    }

    return validationErrors;
  }
}

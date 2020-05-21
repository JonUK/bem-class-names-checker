import ValidationErrorSeverity from "@/models/validationErrorSeverity";

export default class ValidationIssue {

  static createForCritical(message: string) {
    return new ValidationIssue(message, ValidationErrorSeverity.Critical);
  }

  static createForError(message: string) {
    return new ValidationIssue(message, ValidationErrorSeverity.Error);
  }

  private constructor(public message: string, public severity: ValidationErrorSeverity) {
  }
}



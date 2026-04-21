import type { FlattenedValidationErrors, ValidationIssue } from '../types';
import type { ResolvedLocale, TextDirection } from '../i18n/types';

export class ValidationError extends Error {
  public readonly issues: ValidationIssue[];
  public readonly dir: TextDirection;
  public readonly locale: string;

  constructor(
    issues: ValidationIssue | readonly ValidationIssue[],
    locale: Pick<ResolvedLocale, 'code' | 'dir'>,
  ) {
    const list = Array.isArray(issues) ? [...issues] : [issues];
    super(list[0]?.message ?? 'Validation error');
    this.name = 'ValidationError';
    this.issues = list;
    this.dir = locale.dir;
    this.locale = locale.code;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  flatten(): FlattenedValidationErrors {
    const flattened: FlattenedValidationErrors = {
      formErrors: [],
      fieldErrors: {},
    };

    for (const issue of this.issues) {
      const key = issue.path.join('.');
      if (!key) {
        flattened.formErrors.push(issue.message);
        continue;
      }

      if (!flattened.fieldErrors[key]) {
        flattened.fieldErrors[key] = [];
      }

      flattened.fieldErrors[key].push(issue.message);
    }

    return flattened;
  }
}

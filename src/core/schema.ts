import { i18n } from '../i18n';
import type { MessageContext, ResolvedLocale } from '../i18n/types';
import type {
  ParseOptions,
  SafeParseResult,
  ValidationIssue,
  ValidationIssueCode,
} from '../types';
import { ValidationError } from './error';

export type MessageOverride = string | ((context: MessageContext) => string);

export interface InternalParseOptions extends ParseOptions {
  path?: Array<string | number> | undefined;
  label?: string | undefined;
  resolvedLocale?: ResolvedLocale | undefined;
}

interface IssueDetails {
  label?: string | undefined;
  expected?: string | undefined;
  received?: string | undefined;
  minimum?: number | undefined;
  maximum?: number | undefined;
}

function titleCase(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function humanizePathSegment(segment: string | number): string | undefined {
  if (typeof segment !== 'string') {
    return undefined;
  }

  const normalized = segment
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .toLowerCase();

  return normalized ? titleCase(normalized) : undefined;
}

export abstract class Schema<TOutput, TParsed = Exclude<TOutput, undefined>> {
  protected isOptional = false;
  protected fieldLabel: string | undefined = undefined;

  parse(value: unknown, options: ParseOptions | InternalParseOptions = {}): TOutput {
    const internal = this.toInternalOptions(options);
    if (this.isMissing(value)) {
      if (this.isOptional) {
        return undefined as TOutput;
      }

      throw this.createError('required', 'common.required', internal);
    }

    return this.parseValue(value, internal) as unknown as TOutput;
  }

  safeParse(
    value: unknown,
    options: ParseOptions | InternalParseOptions = {},
  ): SafeParseResult<TOutput> {
    try {
      return {
        success: true,
        data: this.parse(value, options),
      };
    } catch (error) {
      if (error instanceof ValidationError) {
        return {
          success: false,
          error,
        };
      }

      throw error;
    }
  }

  label(label: string): this {
    const clone = this.clone();
    clone.fieldLabel = label;
    return clone;
  }

  protected abstract clone(): this;

  protected abstract parseValue(
    value: unknown,
    options: InternalParseOptions,
  ): TParsed;

  protected copyBaseStateTo<TSchema extends Schema<unknown, unknown>>(schema: TSchema): TSchema {
    schema.isOptional = this.isOptional;
    schema.fieldLabel = this.fieldLabel;
    return schema;
  }

  protected createError(
    code: ValidationIssueCode,
    key: string,
    options: InternalParseOptions,
    details: IssueDetails = {},
    messageOverride?: MessageOverride,
  ): ValidationError {
    const resolvedLocale = options.resolvedLocale ?? i18n.resolveLocale(options);
    return new ValidationError(
      this.createIssue(code, key, options, details, messageOverride),
      resolvedLocale,
    );
  }

  protected createIssue(
    code: ValidationIssueCode,
    key: string,
    options: InternalParseOptions,
    details: IssueDetails = {},
    messageOverride?: MessageOverride,
  ): ValidationIssue {
    const resolvedLocale = options.resolvedLocale ?? i18n.resolveLocale(options);
    const context = this.createMessageContext(options, details);
    const message =
      typeof messageOverride === 'function'
        ? messageOverride(context)
        : typeof messageOverride === 'string'
          ? messageOverride
          : i18n.getMessage(key, context, resolvedLocale);

    return {
      code,
      path: [...(options.path ?? [])],
      message,
      label: context.label,
      expected: details.expected,
      received: details.received,
      minimum: details.minimum,
      maximum: details.maximum,
    };
  }

  protected toInternalOptions(options: ParseOptions | InternalParseOptions): InternalParseOptions {
    const internal = options as InternalParseOptions;

    return {
      ...internal,
      path: [...(internal.path ?? [])],
      resolvedLocale: internal.resolvedLocale ?? i18n.resolveLocale(options),
    };
  }

  protected isMissing(value: unknown): boolean {
    return value === undefined || value === null || value === '';
  }

  protected describeType(value: unknown): string {
    if (Array.isArray(value)) {
      return 'array';
    }

    if (value === null) {
      return 'null';
    }

    return typeof value;
  }

  private createMessageContext(
    options: InternalParseOptions,
    details: IssueDetails,
  ): MessageContext {
    return {
      path: [...(options.path ?? [])],
      label: details.label ?? options.label ?? this.fieldLabel ?? this.inferLabelFromPath(options),
      expected: details.expected,
      received: details.received,
      minimum: details.minimum,
      maximum: details.maximum,
    };
  }

  private inferLabelFromPath(options: InternalParseOptions): string | undefined {
    const lastSegment = options.path?.[options.path.length - 1];
    return lastSegment === undefined ? undefined : humanizePathSegment(lastSegment);
  }
}

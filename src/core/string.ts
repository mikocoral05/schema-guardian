import { Schema, type InternalParseOptions, type MessageOverride } from './schema';

interface LengthRule {
  value: number;
  message?: MessageOverride | undefined;
}

export class StringSchema<TOutput = string> extends Schema<TOutput, string> {
  private minLength: LengthRule | undefined = undefined;
  private maxLength: LengthRule | undefined = undefined;
  private shouldValidateEmail = false;
  private emailMessage: MessageOverride | undefined = undefined;
  private shouldTrim = false;

  optional(): StringSchema<TOutput | undefined> {
    const clone = this.clone() as StringSchema<TOutput | undefined>;
    clone.isOptional = true;
    return clone;
  }

  min(length: number, message?: MessageOverride): this {
    const clone = this.clone();
    clone.minLength = message === undefined ? { value: length } : { value: length, message };
    return clone;
  }

  max(length: number, message?: MessageOverride): this {
    const clone = this.clone();
    clone.maxLength = message === undefined ? { value: length } : { value: length, message };
    return clone;
  }

  email(message?: MessageOverride): this {
    const clone = this.clone();
    clone.shouldValidateEmail = true;
    clone.emailMessage = message;
    return clone;
  }

  trim(): this {
    const clone = this.clone();
    clone.shouldTrim = true;
    return clone;
  }

  protected clone(): this {
    const clone = this.copyBaseStateTo(new StringSchema()) as this;
    const stringClone = clone as StringSchema<TOutput>;
    stringClone.minLength = this.minLength ? { ...this.minLength } : undefined;
    stringClone.maxLength = this.maxLength ? { ...this.maxLength } : undefined;
    stringClone.shouldValidateEmail = this.shouldValidateEmail;
    stringClone.emailMessage = this.emailMessage;
    stringClone.shouldTrim = this.shouldTrim;
    return clone;
  }

  protected parseValue(value: unknown, options: InternalParseOptions): string {
    if (typeof value !== 'string') {
      throw this.createError('invalid_type', 'common.invalidType', options, {
        expected: 'string',
        received: this.describeType(value),
      });
    }

    const normalizedValue = this.shouldTrim ? value.trim() : value;

    if (this.minLength && normalizedValue.length < this.minLength.value) {
      throw this.createError(
        'too_small',
        'string.min',
        options,
        { minimum: this.minLength.value },
        this.minLength.message,
      );
    }

    if (this.maxLength && normalizedValue.length > this.maxLength.value) {
      throw this.createError(
        'too_big',
        'string.max',
        options,
        { maximum: this.maxLength.value },
        this.maxLength.message,
      );
    }

    if (this.shouldValidateEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedValue)) {
        throw this.createError(
          'invalid_email',
          'string.email',
          options,
          {},
          this.emailMessage,
        );
      }
    }

    return normalizedValue;
  }
}

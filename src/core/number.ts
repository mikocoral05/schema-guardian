import { Schema, type InternalParseOptions, type MessageOverride } from './schema';

interface NumberRule {
  value: number;
  message?: MessageOverride | undefined;
}

export class NumberSchema<TOutput = number> extends Schema<TOutput, number> {
  private minValue: NumberRule | undefined = undefined;
  private maxValue: NumberRule | undefined = undefined;
  private shouldValidateInteger = false;
  private integerMessage: MessageOverride | undefined = undefined;

  optional(): NumberSchema<TOutput | undefined> {
    const clone = this.clone() as NumberSchema<TOutput | undefined>;
    clone.isOptional = true;
    return clone;
  }

  min(value: number, message?: MessageOverride): this {
    const clone = this.clone();
    clone.minValue = message === undefined ? { value } : { value, message };
    return clone;
  }

  max(value: number, message?: MessageOverride): this {
    const clone = this.clone();
    clone.maxValue = message === undefined ? { value } : { value, message };
    return clone;
  }

  integer(message?: MessageOverride): this {
    const clone = this.clone();
    clone.shouldValidateInteger = true;
    clone.integerMessage = message;
    return clone;
  }

  protected clone(): this {
    const clone = this.copyBaseStateTo(new NumberSchema()) as this;
    const numberClone = clone as NumberSchema<TOutput>;
    numberClone.minValue = this.minValue ? { ...this.minValue } : undefined;
    numberClone.maxValue = this.maxValue ? { ...this.maxValue } : undefined;
    numberClone.shouldValidateInteger = this.shouldValidateInteger;
    numberClone.integerMessage = this.integerMessage;
    return clone;
  }

  protected parseValue(value: unknown, options: InternalParseOptions): number {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw this.createError('invalid_type', 'common.invalidType', options, {
        expected: 'number',
        received: this.describeType(value),
      });
    }

    if (this.shouldValidateInteger && !Number.isInteger(value)) {
      throw this.createError(
        'not_integer',
        'number.integer',
        options,
        {},
        this.integerMessage,
      );
    }

    if (this.minValue && value < this.minValue.value) {
      throw this.createError(
        'too_small',
        'number.min',
        options,
        { minimum: this.minValue.value },
        this.minValue.message,
      );
    }

    if (this.maxValue && value > this.maxValue.value) {
      throw this.createError(
        'too_big',
        'number.max',
        options,
        { maximum: this.maxValue.value },
        this.maxValue.message,
      );
    }

    return value;
  }
}

import { beforeEach, describe, expect, it } from 'vitest';
import { S, i18n } from '../src';

describe('StringSchema', () => {
  beforeEach(() => {
    i18n.setLocale('en');
  });

  it('validates a basic string', () => {
    const schema = S.string();
    expect(schema.parse('hello')).toBe('hello');
  });

  it('keeps builder instances immutable', () => {
    const base = S.string();
    const minFive = base.min(5);

    expect(base.parse('hi')).toBe('hi');
    expect(minFive.safeParse('hi').success).toBe(false);
  });

  it('throws when empty and required', () => {
    const schema = S.string();
    const result = schema.safeParse('');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('This field is required');
      expect(result.error.issues[0]?.code).toBe('required');
    }
  });

  it('treats missing optional values as undefined', () => {
    const schema = S.string().optional();

    expect(schema.parse(undefined)).toBeUndefined();
    expect(schema.parse('')).toBeUndefined();
  });

  it('supports trimming before validation', () => {
    const schema = S.string().trim().min(5);

    expect(schema.parse('  hello  ')).toBe('hello');
  });

  it('validates min length with field context', () => {
    const schema = S.string().label('Name').min(5);
    const result = schema.safeParse('hi');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('Name must be at least 5 characters');
    }
  });

  it('validates max length', () => {
    const schema = S.string().max(3);
    const result = schema.safeParse('hello');

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('This field must be at most 3 characters');
    }
  });

  it('validates email addresses', () => {
    const schema = S.string().trim().email();

    expect(schema.parse(' test@example.com ')).toBe('test@example.com');

    const result = schema.safeParse('invalid-email');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('This field must be a valid email address');
    }
  });
});

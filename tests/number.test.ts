import { beforeEach, describe, expect, it } from 'vitest';
import { S, i18n } from '../src';

describe('NumberSchema', () => {
  beforeEach(() => {
    i18n.setLocale('en');
  });

  it('validates numeric ranges', () => {
    const schema = S.number().label('Age').min(18).max(99);

    expect(schema.parse(22)).toBe(22);

    const result = schema.safeParse(12);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('Age must be greater than or equal to 18');
    }
  });

  it('supports integer-only validation', () => {
    const schema = S.number().integer();
    const result = schema.safeParse(10.5);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('This field must be a whole number');
    }
  });
});

import { beforeEach, describe, expect, it } from 'vitest';
import { S, i18n } from '../src';

describe('ObjectSchema', () => {
  beforeEach(() => {
    i18n.setLocale('en');
  });

  it('validates nested payloads and preserves typed output', () => {
    const schema = S.object({
      name: S.string().min(5),
      email: S.string().trim().email(),
      age: S.number().integer().optional(),
    });

    expect(
      schema.parse({
        name: 'Alice',
        email: ' alice@example.com ',
      }),
    ).toEqual({
      name: 'Alice',
      email: 'alice@example.com',
    });
  });

  it('collects multiple field issues', () => {
    const schema = S.object({
      name: S.string().min(5),
      email: S.string().email(),
      age: S.number().integer().min(18),
    });

    const result = schema.safeParse({
      name: 'Al',
      email: 'bad-email',
      age: 14.2,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(3);
      expect(result.error.flatten()).toEqual({
        formErrors: [],
        fieldErrors: {
          name: ['Name must be at least 5 characters'],
          email: ['Email must be a valid email address'],
          age: ['Age must be a whole number'],
        },
      });
    }
  });

  it('rejects unknown keys in strict mode', () => {
    const schema = S.object({
      name: S.string(),
    }).strict();

    const result = schema.safeParse({
      name: 'Alice',
      admin: true,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten()).toEqual({
        formErrors: [],
        fieldErrors: {
          admin: ['Admin is not allowed'],
        },
      });
    }
  });
});

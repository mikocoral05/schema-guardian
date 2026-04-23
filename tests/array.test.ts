import { beforeEach, describe, expect, it } from 'vitest';
import { S, i18n } from '../src';

describe('ArraySchema', () => {
  beforeEach(() => {
    i18n.setLocale('en');
  });

  it('validates arrays of primitive values', () => {
    const schema = S.array(S.string().trim().min(2)).label('Tags').min(2);

    expect(schema.parse([' js ', 'ts'])).toEqual(['js', 'ts']);
  });

  it('collects container and item issues together', () => {
    const schema = S.object({
      tags: S.array(S.string().min(3)).label('Tags').min(2),
    });
    const result = schema.safeParse({ tags: ['hi'] });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten()).toEqual({
        formErrors: [],
        fieldErrors: {
          tags: ['Tags must contain at least 2 items'],
          'tags.0': ['This field must be at least 3 characters'],
        },
      });
    }
  });

  it('validates arrays of objects', () => {
    const schema = S.object({
      members: S.array(
        S.object({
          name: S.string().min(2),
        }),
      ),
    });

    const result = schema.safeParse(
      {
        members: [{ name: 'A' }],
      },
      {
        locale: 'fr',
      },
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten()).toEqual({
        formErrors: [],
        fieldErrors: {
          'members.0.name': ['Name doit contenir au moins 2 caractères'],
        },
      });
    }
  });
});

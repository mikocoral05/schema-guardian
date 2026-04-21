import { beforeEach, describe, expect, it } from 'vitest';
import { S, i18n } from '../src';

describe('i18n integration', () => {
  beforeEach(() => {
    i18n.setLocale(undefined);
    i18n.setDefaultLocale('en');
  });

  it('uses bundled French translations automatically', () => {
    const result = S.string().label('Nom').min(5).safeParse('hi', {
      locale: 'fr',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('Nom doit contenir au moins 5 caractères');
      expect(result.error.dir).toBe('ltr');
      expect(result.error.locale).toBe('fr');
    }
  });

  it('resolves Arabic and exposes RTL direction', () => {
    const result = S.string().label('الاسم').min(5).safeParse('hi', {
      locale: 'ar',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBe('الاسم يجب أن يتكون من 5 أحرف على الأقل');
      expect(result.error.dir).toBe('rtl');
    }
  });

  it('falls back from regional language tags', () => {
    const result = S.string().email().safeParse('bad-email', {
      locale: 'fr-CA',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.locale).toBe('fr');
      expect(result.error.message).toBe('Ce champ doit être une adresse e-mail valide');
    }
  });

  it('supports accept-language negotiation', () => {
    const result = S.string().label('Name').min(5).safeParse('hi', {
      acceptLanguage: 'ja-JP,fr;q=0.8,en;q=0.7',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.locale).toBe('ja');
      expect(result.error.message).toBe('Nameは5文字以上で入力してください');
    }
  });

  it('supports Tagalog aliases via browser language hints', () => {
    const result = S.string().label('Pangalan').min(5).safeParse('hi', {
      browserLanguages: ['fil-PH'],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.locale).toBe('tl');
      expect(result.error.message).toBe('Pangalan ay dapat may hindi bababa sa 5 character');
    }
  });
});

import { ar, en, fr, ja, tl } from './locales';
import type {
  LocaleDefinition,
  LocaleDetectionOptions,
  MessageContext,
  MessageValue,
  ResolvedLocale,
} from './types';

function normalizeLocaleCode(code: string): string {
  return code.trim().replace(/_/g, '-').toLowerCase();
}

function unique<T>(values: readonly T[]): T[] {
  return [...new Set(values)];
}

function parseAcceptLanguage(
  header?: string | readonly string[],
): string[] {
  const raw =
    typeof header === 'string'
      ? header
      : Array.isArray(header)
        ? header.join(',')
        : '';

  if (!raw.trim()) {
    return [];
  }

  return raw
    .split(',')
    .map((entry: string) => {
      const [tagPart, ...params] = entry.trim().split(';');
      const tag = normalizeLocaleCode(tagPart ?? '');
      const qParam = params.find((param: string) => param.trim().startsWith('q='));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;

      return {
        tag,
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .filter((entry: { tag: string; q: number }) => entry.tag !== '*')
    .sort(
      (left: { tag: string; q: number }, right: { tag: string; q: number }) =>
        right.q - left.q,
    )
    .map((entry: { tag: string; q: number }) => entry.tag);
}

function browserLanguagesFromRuntime(): string[] {
  if (typeof navigator === 'undefined') {
    return [];
  }

  const candidates = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter((value): value is string => typeof value === 'string' && value.length > 0);

  return candidates.map(normalizeLocaleCode);
}

function resolveMessage(
  locale: LocaleDefinition,
  key: string,
): MessageValue | undefined {
  const parts = key.split('.');
  let current: unknown = locale.messages;

  for (const part of parts) {
    if (typeof current !== 'object' || current === null || !(part in current)) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current as MessageValue | undefined;
}

function isResolvedLocale(value: unknown): value is ResolvedLocale {
  return (
    typeof value === 'object' &&
    value !== null &&
    'locale' in value &&
    'code' in value &&
    'dir' in value
  );
}

class I18nRegistry {
  private readonly locales = new Map<string, LocaleDefinition>();
  private readonly aliases = new Map<string, string>();
  private defaultLocale = 'en';
  private currentLocale: string | undefined = undefined;

  constructor(initialLocales: readonly LocaleDefinition[] = [en, fr, ja, tl, ar]) {
    this.registerMany(initialLocales);
  }

  register(locale: LocaleDefinition): void {
    const normalizedCode = normalizeLocaleCode(locale.code);
    const normalizedAliases = locale.aliases?.map(normalizeLocaleCode);
    const normalizedLocale: LocaleDefinition = normalizedAliases
      ? {
          ...locale,
          code: normalizedCode,
          aliases: normalizedAliases,
        }
      : {
          ...locale,
          code: normalizedCode,
        };

    this.locales.set(normalizedCode, normalizedLocale);
    this.aliases.set(normalizedCode, normalizedCode);

    const aliases = unique([
      normalizedCode,
      normalizedCode.split('-')[0],
      ...(normalizedLocale.aliases ?? []),
    ].filter((value): value is string => typeof value === 'string' && value.length > 0));

    for (const alias of aliases) {
      this.aliases.set(alias, normalizedCode);
    }
  }

  registerMany(locales: readonly LocaleDefinition[]): void {
    for (const locale of locales) {
      this.register(locale);
    }
  }

  setDefaultLocale(code: string): void {
    this.defaultLocale = normalizeLocaleCode(code);
  }

  setLocale(code: string | undefined): void {
    this.currentLocale = code ? normalizeLocaleCode(code) : undefined;
  }

  supportedLocales(): string[] {
    return [...this.locales.keys()];
  }

  resolveLocale(source?: LocaleDetectionOptions | ResolvedLocale): ResolvedLocale {
    if (isResolvedLocale(source)) {
      return source;
    }

    const candidates = unique([
      source?.locale ? normalizeLocaleCode(source.locale) : undefined,
      this.currentLocale,
      ...(source?.browserLanguages?.map(normalizeLocaleCode) ?? []),
      ...parseAcceptLanguage(source?.acceptLanguage),
      ...browserLanguagesFromRuntime(),
      this.defaultLocale,
      'en',
    ].filter((value): value is string => typeof value === 'string' && value.length > 0));

    for (const candidate of candidates) {
      const exact = this.locales.get(candidate);
      if (exact) {
        return {
          code: exact.code,
          dir: exact.dir,
          locale: exact,
        };
      }

      const alias = this.aliases.get(candidate);
      if (alias) {
        const locale = this.locales.get(alias);
        if (locale) {
          return {
            code: locale.code,
            dir: locale.dir,
            locale,
          };
        }
      }

      const baseCode = candidate.split('-')[0] ?? candidate;
      const baseAlias = this.aliases.get(baseCode);
      if (baseAlias) {
        const locale = this.locales.get(baseAlias);
        if (locale) {
          return {
            code: locale.code,
            dir: locale.dir,
            locale,
          };
        }
      }
    }

    const fallback = this.locales.get('en') ?? [...this.locales.values()][0];
    if (!fallback) {
      throw new Error('No locales have been registered');
    }

    return {
      code: fallback.code,
      dir: fallback.dir,
      locale: fallback,
    };
  }

  getLocaleCode(source?: LocaleDetectionOptions | ResolvedLocale): string {
    return this.resolveLocale(source).code;
  }

  getLocale(source?: LocaleDetectionOptions | ResolvedLocale): LocaleDefinition {
    return this.resolveLocale(source).locale;
  }

  getMessage(
    key: string,
    context: MessageContext = { path: [] },
    source?: LocaleDetectionOptions | ResolvedLocale,
  ): string {
    const resolved = this.resolveLocale(source);
    const fallback = this.locales.get('en');
    const message =
      resolveMessage(resolved.locale, key) ??
      (fallback ? resolveMessage(fallback, key) : undefined);

    if (typeof message === 'function') {
      return message(context);
    }

    if (typeof message === 'string') {
      return message;
    }

    return key;
  }

  getDir(source?: LocaleDetectionOptions | ResolvedLocale) {
    return this.resolveLocale(source).dir;
  }
}

export const i18n = new I18nRegistry();
export type {
  LocaleDefinition,
  LocaleDetectionOptions,
  MessageContext,
  MessageValue,
  ResolvedLocale,
} from './types';
export { ar, en, fr, ja, tl } from './locales';

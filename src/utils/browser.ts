// Safe browser utilities with graceful fallbacks for Safari Private Mode,
// sandboxed iframes, restricted storage WebViews, and legacy browsers.

const memoryStorage = new Map<string, string>();

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Fallback to in-memory storage when localStorage is blocked
    }
    return memoryStorage.has(key) ? memoryStorage.get(key)! : null;
  },

  setItem(key: string, value: string): void {
    memoryStorage.set(key, value);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignore quota/security errors in restricted browsers
    }
  },

  removeItem(key: string): void {
    memoryStorage.delete(key);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore security errors in restricted browsers
    }
  },
};

export function safeParseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeScrollToTop(): void {
  if (typeof window === 'undefined') return;
  try {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  } catch {
    window.scrollTo(0, 0);
  }
}

export function safeScrollIntoView(element: HTMLElement | null): void {
  if (!element) return;
  try {
    if ('scrollBehavior' in document.documentElement.style) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      element.scrollIntoView(true);
    }
  } catch {
    element.scrollIntoView(true);
  }
}

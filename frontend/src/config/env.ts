/**
 * Centralized environment access. Every place in the app that needs a
 * config value reads it from here — never `import.meta.env` directly.
 */
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
} as const;

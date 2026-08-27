import '@testing-library/jest-dom/vitest';

// jsdom does not implement IntersectionObserver — stub it so components
// using useActiveSection can render in tests.
class IntersectionObserverStub {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

// @ts-expect-error - test environment stub, not a full implementation
window.IntersectionObserver = IntersectionObserverStub;

// jsdom does not implement matchMedia — stub it so useTheme /
// usePrefersReducedMotion can run under tests.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

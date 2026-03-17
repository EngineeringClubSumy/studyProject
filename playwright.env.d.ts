/**
 * Fallback types when node_modules is not yet installed.
 * Run: npm install
 * After install, @playwright/test provides its own types.
 */
declare module '@playwright/test' {
  export function test(name: string, fn: (args: { page: unknown }) => Promise<void>): void;
  export const expect: unknown;
  export function defineConfig(config: object): object;
  export const devices: Record<string, { viewport?: object; userAgent?: string }>;
}

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
// Nuxt 3 specific testing setup might require more complex integration
// For example, using nuxt-vitest or @nuxt/test-utils for a more integrated experience.
// However, for basic component and store tests, a simpler setup can often work.
// We might need to explicitly mock Nuxt composables like useRoute, navigateTo if they are
// part of the component's direct usage and not easily testable in isolation.

export default defineConfig({
  plugins: [
    vue(), // Ensure Vue plugin is used for .vue files
  ],
  test: {
    globals: true, // Use Vitest global APIs (describe, test, expect)
    environment: 'happy-dom', // Or 'jsdom' - happy-dom is generally faster
    setupFiles: [], // Optional: for global test setup (e.g., mocking Nuxt composables)
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'], // File patterns for tests

    // Ensure that Nuxt's auto-imports and aliases are handled.
    // This might require more specific aliasing if not using a Nuxt-specific test runner.
    // For basic tests, explicit imports might be more reliable initially.
    // Example alias (though Nuxt handles `~/` automatically in its own build):
    // resolve: {
    //   alias: {
    //     '~': new URL('.', import.meta.url).pathname, // Adjust if vitest.config.ts is not at root
    //   }
    // },

    // If components use NuxtLink, it might need to be stubbed or mocked globally
    // or tests might need to be adapted.
    // deps: {
    //   inline: ['@nuxt/test-utils-edge'], // If using Nuxt test utils
    // },
  },
})

<template>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="flex flex-col items-center">
      <!-- Larger spinner for screen overlay -->
      <svg
        class="animate-spin h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p v-if="message" class="mt-4 text-white text-lg">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
/* Tailwind's animate-spin is used for the SVG. */
/* The background opacity and centering are handled by Tailwind classes. */
</style>

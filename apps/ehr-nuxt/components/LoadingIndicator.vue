<template>
  <div class="inline-flex items-center text-sm text-gray-700">
    <span>refreshing</span>
    <span class="animate-pulse-dot mx-px">.</span>
    <span class="animate-pulse-dot animation-delay-200 mx-px">.</span>
    <span class="animate-pulse-dot animation-delay-400 mx-px">.</span>
    <!-- Simple spinning icon (e.g., an SVG or a character) -->
    <svg
      class="animate-spin h-4 w-4 ml-2 text-blue-500"
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
  </div>
</template>

<script setup lang="ts">
// No props needed for this simple version
</script>

<style scoped>
/* Custom animation for dots if needed, or rely on Tailwind's pulse if sufficient */
/* For a simple sequential dot animation: */
.animate-pulse-dot {
  animation: pulse-dot 1.4s infinite;
  opacity: 0;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

/* Tailwind's animate-spin is typically sufficient for the SVG */
</style>

<template>
  <div v-if="type === 'status bullet'" class="flex items-center mr-2">
    <div class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: fill }"></div>
  </div>

  <span
    v-else-if="type === 'document'"
    :style="documentStyle"
    class="px-2 py-1 rounded inline-flex items-center text-xs font-medium"
  >
    <svg
      v-if="completed"
      class="w-3 h-3 mr-1"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue'

interface Props {
  type: 'status bullet' | 'document';
  fill: string; // Expected to be a valid CSS color for 'status bullet' and completed 'document' background
  label?: string;
  completed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  completed: false,
});

const documentStyle = computed((): CSSProperties => {
  if (props.completed) {
    return {
      backgroundColor: props.fill,
      color: 'white', // Assuming contrast text is white, this could be a prop too
    };
  } else {
    // Tailwind's gray-200 and gray-600 for text
    return {
      backgroundColor: '#E5E7EB', // bg-gray-200
      color: '#4B5563',       // text-gray-600
    };
  }
});
</script>

<style scoped>
/* Scoped styles if needed */
</style>

<template>
  <div
    :class="[
      'w-full flex items-center justify-center p-2 sticky top-0 z-50',
      backgroundColorClass,
      textColorClass,
      heightClass,
    ]"
  >
    <span v-if="icon" :class="['mr-2', iconSizeClass]">
      {{ icon === 'info' ? '(i)' : icon === 'warning' ? '(!)' : '' }}
    </span>
    <div>
      <p class="text-sm font-medium">{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  text: string;
  icon?: 'info' | 'warning';
  iconSize?: 'small' | 'medium' | 'large';
  height?: string; // e.g., 'h-12', 'h-16'
  bgcolor?: string; // e.g., 'bg-blue-500', 'bg-red-100'
  color?: string; // e.g., 'text-white', 'text-gray-800'
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 'medium',
  height: 'h-14', // Default height, similar to BANNER_HEIGHT
  bgcolor: 'bg-blue-500', // Default background
  color: 'text-white',    // Default text color
});

const backgroundColorClass = computed(() => props.bgcolor);
const textColorClass = computed(() => props.color);
const heightClass = computed(() => props.height);

const iconSizeClass = computed(() => {
  switch (props.iconSize) {
    case 'small':
      return 'text-xs';
    case 'medium':
      return 'text-sm';
    case 'large':
      return 'text-base';
    default:
      return 'text-sm';
  }
});
</script>

<style scoped>
/* Scoped styles if needed, though Tailwind aims for utility-first */
</style>

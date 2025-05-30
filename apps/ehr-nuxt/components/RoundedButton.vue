<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :target="target"
    :class="buttonClasses"
    :aria-disabled="disabled"
    :event="disabled ? '' : 'click'"
    @click="handleClick"
  >
    <slot></slot>
  </NuxtLink>
  <button
    v-else
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  to?: string;
  target?: '_self' | '_blank' | '_parent' | '_top' | string;
  disabled?: boolean;
  variant?: 'outlined' | 'filled' | 'text'; // Added 'text' for more flexibility
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'danger'; // For predefined color schemes
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  variant: 'outlined',
  size: 'medium',
  color: 'primary',
});

const emit = defineEmits(['click']);

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};

const baseClasses = 'rounded-full font-medium normal-case whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2';

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'px-3 py-1.5 text-xs';
    case 'medium':
      return 'px-4 py-2 text-sm'; // MUI large is often like a medium in Tailwind
    case 'large':
      return 'px-6 py-3 text-base';
    default:
      return 'px-4 py-2 text-sm';
  }
});

const colorVariantClasses = computed(() => {
  const colorMap = {
    primary: {
      filled: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      outlined: 'border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      text: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    },
    secondary: {
      filled: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
      outlined: 'border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
      text: 'text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
    },
    danger: {
      filled: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      outlined: 'border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
      text: 'text-red-600 hover:bg-red-50 focus:ring-red-500',
    }
  };

  const selectedColor = colorMap[props.color] || colorMap.primary;

  switch (props.variant) {
    case 'filled':
      return selectedColor.filled;
    case 'outlined':
      return `border ${selectedColor.outlined}`; // Add border class for outlined
    case 'text':
      return selectedColor.text;
    default:
      return `border ${selectedColor.outlined}`;
  }
});

const disabledClasses = computed(() => {
  return props.disabled ? 'opacity-50 cursor-not-allowed' : 'transition ease-in-out duration-150';
});

const buttonClasses = computed(() => {
  return [
    baseClasses,
    sizeClasses.value,
    colorVariantClasses.value,
    disabledClasses.value,
  ].join(' ');
});

</script>

<style scoped>
/* Any specific scoped styles if Tailwind utilities aren't enough */
a[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.5; /* Or your preferred disabled style for links */
}
</style>

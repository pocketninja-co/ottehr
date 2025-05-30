<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">Logout Page</h1>
    <p class="mb-2">Path: /logout</p>

    <div v-if="userStore.isAuthenticated" class="mt-4">
      <RoundedButton @click="handleLogout" variant="filled" color="primary">
        Confirm Logout
      </RoundedButton>
    </div>

    <p class="mt-4 text-lg">{{ userStore.welcomeMessage }}</p>

    <div v-if="!userStore.isAuthenticated" class="mt-4">
      <p>You have been logged out.</p>
      <NuxtLink to="/login" class="text-blue-600 hover:underline">Go to Login</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user';
import RoundedButton from '~/components/RoundedButton.vue';
import { navigateTo } from '#app'; // Or import { useRouter } from 'vue-router' in Nuxt 3

const userStore = useUserStore();

const handleLogout = async () => { // Made async
  userStore.logout();
  // Redirect to /login after logout
  await navigateTo('/login');
};

// Display initial message
console.log(userStore.welcomeMessage);
</script>

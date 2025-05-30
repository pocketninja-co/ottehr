<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">Login Page</h1>
    <p class="mb-2">Path: /login</p>

    <div v-if="!userStore.isAuthenticated" class="mt-4">
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            id="username"
            v-model="inputUsername"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <RoundedButton type="submit" variant="filled" color="primary">
          Login
        </RoundedButton>
      </form>
    </div>

    <p class="mt-4 text-lg">{{ userStore.welcomeMessage }}</p>

    <div v-if="userStore.isAuthenticated" class="mt-4">
       <RoundedButton @click="handleTempLogout" variant="outlined" color="secondary">
        (Temp Logout on this page)
      </RoundedButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '~/store/user';
import RoundedButton from '~/components/RoundedButton.vue'; // Assuming RoundedButton is in components

const userStore = useUserStore();
const inputUsername = ref('');

const handleLogin = async () => { // Made async for potential await with navigateTo
  if (inputUsername.value.trim()) {
    userStore.login(inputUsername.value.trim());
    inputUsername.value = ''; // Clear input after login
    // Redirect to /visits after successful login
    // Nuxt's navigateTo is asynchronous but often doesn't need await for simple cases
    // However, good practice if there were subsequent operations depending on navigation completing.
    await navigateTo('/visits');
  }
};

// Added a temporary logout on this page for easier testing of the login form
const handleTempLogout = async () => { // Made async for potential await with navigateTo
  userStore.logout();
  // If logging out from the login page itself, perhaps redirect to login again or a public home.
  // For now, this button is mostly for testing the form display.
  // If this button were the primary logout, it should redirect to /login.
  // await navigateTo('/login');
}
</script>

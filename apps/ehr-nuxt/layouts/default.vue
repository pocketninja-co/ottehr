<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navigation Bar -->
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex items-center space-x-4">
        <NuxtLink to="/visits" class="hover:bg-gray-700 px-3 py-2 rounded-md">Home (Visits)</NuxtLink>
        <NuxtLink to="/patients" class="hover:bg-gray-700 px-3 py-2 rounded-md">Patients</NuxtLink>
        <NuxtLink to="/employees" class="hover:bg-gray-700 px-3 py-2 rounded-md">Employees</NuxtLink>
        <NuxtLink to="/schedules" class="hover:bg-gray-700 px-3 py-2 rounded-md">Schedules</NuxtLink>
        <NuxtLink to="/telemed/appointments" class="hover:bg-gray-700 px-3 py-2 rounded-md">Telemed</NuxtLink>

        <div class="ml-auto flex items-center space-x-4">
          <span class="text-sm">{{ userStore.welcomeMessage }}</span>
          <NuxtLink v-if="!userStore.isAuthenticated" to="/login" class="hover:bg-gray-700 px-3 py-2 rounded-md">Login</NuxtLink>
          <NuxtLink v-else to="/logout" class="hover:bg-gray-700 px-3 py-2 rounded-md">Logout</NuxtLink>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <main class="flex-grow container mx-auto p-4">
      <slot />
    </main>

    <!-- Placeholder for Footer -->
    <footer class="bg-gray-200 text-center p-4 mt-auto">
      <p>Footer Placeholder</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
</script>

<style scoped>
/* Scoped styles for the layout */
</style>

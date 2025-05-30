<template>
  <div>
    <h1>Visit Detail Page</h1>
    <p>Path: /visits/{{ $route.params.id }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

const route = useRoute()
// You can access the id with route.params.id
// In a real app, you'd fetch specific visit data here using route.params.id
// e.g., const { data: visitDetails } = useAsyncData('visitDetails', () => fetchAppointmentById(route.params.id as string))
</script>

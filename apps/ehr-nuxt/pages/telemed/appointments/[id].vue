<template>
  <div>
    <h1>Telemed Appointment Detail Page</h1>
    <p>Path: /telemed/appointments/{{ $route.params.id }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
// You can access the id with route.params.id
</script>

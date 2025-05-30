<template>
  <div>
    <h1>Patient Detail Page</h1>
    <p>Path: /patients/{{ $route.params.id }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
// You can access the id with route.params.id
</script>

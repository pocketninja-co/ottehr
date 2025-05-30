<template>
  <div>
    <h1>Employee Detail Page</h1>
    <p>Path: /employees/{{ $route.params.id }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
// You can access the id with route.params.id
</script>

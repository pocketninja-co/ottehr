<template>
  <div>
    <h1>Add New Visit Page</h1>
    <p>Path: /visits/add</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});
</script>

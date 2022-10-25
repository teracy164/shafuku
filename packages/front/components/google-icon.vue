<template>
  <i class="material-symbols-outlined">
    {{ icon }}
  </i>
</template>
<script setup lang="ts">
const { icon } = defineProps({ icon: String });
</script>

<template>
  <el-dialog :model-value="visible" @update:model-value="emit('update:visible', $event)">
    <template #header>
      <slot name="header" />
    </template>
    <div class="contents">
      <slot />
    </div>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
const { visible } = defineProps<{ visible: boolean }>();
const emit = defineEmits(['closed', 'update:visible']);
</script>

<template>
  <el-card class="m-2 w-[250px] min-w-[250px]">
    <div class="flex flex-col h-full">
      <div class="border-b-[1px] border-solid b-color-gray-300 mb-2">
        <p class="text-xl">{{ task.title }}</p>
        <p class="flex items-center py-1 orderer text-sm">
          <GoogleIcon icon="account_circle" class="pr-1" />
          <span>{{ task.orderer }}</span>
        </p>
      </div>
      <div class="contents grow">
        <div class="mb-2 h-20 max-h-20 overflow">
          <pre class="whitespace-pre-wrap" style="font: inherit; max-height: 100%; overflow-y: auto">{{ task.contents }}</pre>
        </div>
        <div class="flex items-center">
          <GoogleIcon icon="event" class="text-base pr-2" />
          <span class="text-sm">
            <span v-if="task.startDate"> {{ task.startDate }}～ </span>
            {{ task.endDate }}
          </span>
        </div>
        <div class="flex">
          <div class="flex items-center mr-4">
            <GoogleIcon icon="payments" class="text-base pr-2" />
            <span class="text-sm">{{ $currency(task.rewards) }}</span>
          </div>
          <div class="flex items-center">
            <GoogleIcon icon="group" class="text-base pr-2" />
            <span class="text-sm">{{ task.assigners?.length || 0 }}/{{ task.numOfRecruit }}</span>
          </div>
        </div>
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { Task } from '~~/openapi';

const { task } = defineProps<{ task: Task }>();
</script>
<style lang="scss" scoped>
.orderer {
  .material-symbols-outlined {
    font-size: 1.3em;
  }
}
</style>

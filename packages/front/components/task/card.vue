<template>
  <el-card class="m-2 w-[250px] min-w-[250px] task-card">
    <div class="flex flex-col h-full">
      <div class="border-b-[1px] border-solid b-color-gray-300 mb-2">
        <p class="text-xl task-title" :title="task.title">{{ task.title }}</p>
        <p class="flex items-center py-1 orderer text-sm task-orderer">
          <GoogleIcon icon="account_circle" class="pr-1" />
          <span :title="task.orderer">{{ task.orderer }}</span>
        </p>
      </div>
      <div class="grow">
        <div class="mb-2 h-20 max-h-20 overflow">
          <pre class="whitespace-pre-wrap" style="font: inherit; max-height: 100%; overflow-y: auto">{{ task.contents }}</pre>
        </div>
      </div>
      <div>
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
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { Task } from '~~/openapi';

const { task } = defineProps<{ task: Task }>();
</script>
<style lang="scss">
.task-card {
  .el-card__body {
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.task-card {
  .task-title {
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
  }

  .task-orderer {
    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      overflow: hidden;
    }
  }
}
.orderer {
  .material-symbols-outlined {
    font-size: 1.3em;
  }
}
</style>

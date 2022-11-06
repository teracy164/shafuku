<template>
  <div>
    <div class="border p-5">
      検索したい
      <div class="flex justify-end">
        <el-button type="primary">検索</el-button>
      </div>
    </div>
    <div class="flex flex-wrap">
      <TaskCard v-for="task of tasks" :task="task" class="cursor-pointer hover:bg-blue-50" @click="showDetail(task)" />
    </div>
    <TaskDetailDialog v-if="dialog.visible" v-model:visible="dialog.visible" v-model:task="dialog.task" @updated="updatedTask" />
  </div>
</template>
<script lang="ts" setup>
import { Task } from '~~/openapi';

const { $api } = useNuxtApp();
const tasks = await $api.getTasks();

const dialog = reactive<{ visible: boolean; task: Task }>({
  visible: false,
  task: null,
});

const showDetail = (task: Task) => {
  dialog.task = task;
  dialog.visible = true;
};

const updatedTask = () => {
  // TODO めんどうなので画面リロード
  location.reload();
};

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});
</script>

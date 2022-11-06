<template>
  <div>
    <div class="mb-10">
      <span class="my-headline text-xl">最新のタスク</span>
      <div class="max-w-full overflow-x-auto">
        <div class="flex">
          <TaskCard v-for="task of tasks" :task="task" class="cursor-pointer hover:bg-blue-50" @click="selectTask(task)" />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div class="col-span-1">
        <span class="my-headline text-xl">マイタスク</span>
        <div class="p-2">
          <template v-if="myTasks?.length">
            <el-card v-for="task of myTasks" class="mb-2 my-task cursor-pointer hover:bg-blue-50" @click="selectTask(task)">
              <h5 class="text-bold">{{ task.title }}</h5>
              <p class="text-sm text-gray-300">
                <span v-if="task.startDate">{{ task.startDate }}～</span>
                {{ task.endDate }}
              </p>
            </el-card>
          </template>
          <span v-else>なし</span>
        </div>
      </div>
      <div class="col-span-1">
        <span class="my-headline text-xl">アクティビティ</span>
        <ul>
          <li>●●を受領しました</li>
          <li>XXXさんが●●を受領しました</li>
        </ul>
      </div>
    </div>
    <TaskDetailDialog v-if="dialog.visible" v-model:visible="dialog.visible" v-model:task="dialog.task" @updated="updatedTask" />
  </div>
</template>
<script lang="ts" setup>
import { Task } from '~~/openapi';

const { $api, $auth } = useNuxtApp();
const dialog = reactive<{ visible: boolean; task: Task }>({ visible: false, task: null });

const [tasks, myTasks] = await Promise.all([$api.getTasks(), $api.getTasks({ userId: $auth.loginUser.id })]);

const selectTask = (task: Task) => {
  dialog.task = task;
  dialog.visible = true;
};

const updatedTask = (task: Task) => {
  const target = tasks.find((t) => t.id === task.id);
  if (target) {
    Object.assign(target, task);
  }
};

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});
</script>
<style lang="scss">
.my-task {
  .el-card__body {
    padding: 5px 10px;
  }
}
</style>

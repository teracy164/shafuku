<template>
  <div v-loading="isLoading">
    <div class="relative border p-5">
      <label class="absolute top-[-0.8em] bg-white px-5">検索</label>
      <div class="flex">
        <div class="mr-2">
          <el-input v-model="search.keyword" placeholder="キーワード" />
        </div>
        <div class="mr-2">
          <el-input v-model="search.orderer" placeholder="依頼者" />
        </div>
      </div>
      <div class="flex justify-end">
        <el-button type="primary" @click="searchTasks">検索</el-button>
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

const search = reactive({
  keyword: '',
  orderer: '',
});
const isLoading = ref(false);
const tasks = ref([]);

const searchTasks = async () => {
  isLoading.value = true;
  tasks.value = await $api.getTasks({
    keyword: search.keyword,
    orderer: search.orderer,
  });
  isLoading.value = false;
};

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

// 初期表示用の検索
searchTasks();

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});
</script>

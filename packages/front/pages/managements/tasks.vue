<template>
  <div>
    <el-table :data="tasks" stripe :style="{ width: '100%' }">
      <el-table-column width="60">
        <template #header>
          <el-button type="primary" link @click="add">
            <GoogleIcon icon="add" />
          </el-button>
        </template>
        <template #default="scope">
          <el-button link @click="showDetail(scope.row)">
            <GoogleIcon icon="menu" />
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="タイトル" width="180" />
      <el-table-column prop="orderer" label="依頼主" width="180" />
      <el-table-column prop="rewards" label="報酬">
        <template #default="scope">
          {{ $currency(scope.row.rewards) }}
        </template>
      </el-table-column>
      <el-table-column label="対象日" width="200">
        <template #default="scope">
          <span v-if="scope.row.startDate"> {{ scope.row.startDate }} ～ </span>
          <span> {{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rewards" label="募集">
        <template #default="scope">
          <span> {{ scope.row.assigners?.length || 0 }} / {{ scope.row.numOfRecruit }}</span>
        </template>
      </el-table-column>
    </el-table>

    <TaskDetailDialog v-if="state.detailDialog.visible" v-model:visible="state.detailDialog.visible" :task="state.detailDialog.task" />
    <TaskEditDialog v-if="state.editDialog.visible" v-model:visible="state.editDialog.visible" :task="state.editDialog.task" />
  </div>
</template>
<script lang="ts" setup>
import { Task } from '~~/openapi';

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});

type DialogData = { visible: boolean; task: Task | null };
const state = reactive<{ editDialog: DialogData; detailDialog: DialogData }>({
  editDialog: { visible: false, task: null },
  detailDialog: { visible: false, task: null },
});

const { $api } = useNuxtApp();
const tasks = await $api.getTasks();

const showDetail = (task: Task) => {
  state.detailDialog = { visible: true, task };
};
const add = () => {
  state.editDialog = { visible: true, task: null };
};
</script>

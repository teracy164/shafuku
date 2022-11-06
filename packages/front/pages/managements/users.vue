<template>
  <div>
    <el-table :data="users" style="width: 100%">
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
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column label="権限">
        <template #default="scope">
          {{ UserUtil.getAuthorityName(scope.row) }}
        </template>
      </el-table-column>
    </el-table>

    <UserDetailDialog v-if="state.detailDialog.visible" v-model:visible="state.detailDialog.visible" :user="state.detailDialog.user" />
    <UserEditDialog v-if="state.editDialog.visible" v-model:visible="state.editDialog.visible" :user="state.editDialog.user" />
  </div>
</template>
<script lang="ts" setup>
import { User } from '~~/openapi';
import { UserUtil } from '~~/shared/utils/user';

const { $api } = useNuxtApp();

const users = await $api.getUsers();

type DialogData = { visible: boolean; user?: User };
const state = reactive<{ editDialog: DialogData; detailDialog: DialogData }>({
  editDialog: { visible: false, user: null },
  detailDialog: { visible: false, user: null },
});

const add = () => {
  state.editDialog.user = null;
  state.editDialog.visible = true;
};

const showDetail = (user: User) => {
  state.detailDialog.user = user;
  state.detailDialog.visible = true;
};

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});
</script>

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
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { User } from '~~/openapi';

const { $api } = useNuxtApp();

const users = await $api.getUsers();

const add = () => {
  alert('ユーザーが追加出来たら良いよね');
};

const showDetail = (user: User) => {
  alert('詳細が見たいよね');
};

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});
</script>

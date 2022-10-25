<template>
  <div>
    <el-table :data="users" style="width: 100%">
      <el-table-column width="60">
        <template #header>
          <el-button type="primary" link>
            <GoogleIcon icon="add" />
          </el-button>
        </template>
        <template #default="scope">
          <el-button link>
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
const { $api } = useNuxtApp();

const users = await $api.getUsers();

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});
</script>

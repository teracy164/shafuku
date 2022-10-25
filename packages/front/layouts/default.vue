<template>
  <div class="flex flex-col h-screen">
    <el-menu background-color="#336" text-color="white" :default-active="activeIndex" :ellipsis="false" mode="horizontal">
      <el-menu-item>
        <div>
          <h1 class="m-0 leading-none text-2xl">Shafuku</h1>
          <p class="m-0 leading-none text-xs">-社内副業システム-</p>
        </div>
      </el-menu-item>
      <div class="grow" />
      <el-sub-menu v-if="$auth.isLoggedIn()" index="user-menu">
        <template #title>{{ $auth.loginUser?.name }}</template>
        <el-menu-item index="logout" @click="$auth.logout()">Logout</el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else index="login" @click="navigateTo({ path: '/login' })">Login</el-menu-item>
    </el-menu>
    <div class="basis-full">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
const activeIndex = ref('1');
</script>

<template>
  <DefaultLayout :login-user="$auth.loginUser">
    <SideMenu :menu-items="menuItems">
      <slot />
    </SideMenu>
  </DefaultLayout>
</template>
<script lang="ts" setup>
import DefaultLayout from './default.vue';
import { MenuItem } from '~~/types';

const menuItems: MenuItem[] = [
  { label: 'TOP', icon: 'home', link: '/' },
  { label: 'マイページ', icon: 'person', link: '/my-page' },
  {
    label: '管理者メニュー',
    icon: 'manage_search',
    children: [
      { label: 'ユーザー管理', link: '/managements/users' },
      { label: 'タスク管理', link: '/managements/tasks' },
    ],
  },
  { label: '設定', icon: 'settings', link: '/settings' },
];
</script>

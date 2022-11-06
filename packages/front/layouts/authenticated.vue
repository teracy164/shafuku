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
import { AUTHORITY } from '~~/shared/constants/authorities';

const menuItems: MenuItem[] = [
  { label: 'TOP', icon: 'home', link: '/' },
  { label: 'タスク一覧', icon: 'task', link: '/tasks' },
  { label: 'マイページ', icon: 'person', link: '/my-page' },
];

const { $auth } = useNuxtApp();
if ($auth.hasAuthority(AUTHORITY.SYSTEM_ADMIN)) {
  menuItems.push({
    label: '管理者メニュー',
    icon: 'manage_search',
    children: [
      { label: 'ユーザー管理', link: '/managements/users' },
      { label: 'タスク管理', link: '/managements/tasks' },
    ],
  });
}
</script>

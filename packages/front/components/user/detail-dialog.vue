<template>
  <Dialog :visible="visible" @update:visible="_visible = false">
    <template #header> ユーザー詳細 </template>
    <div class="grid grid-cols-12">
      <div class="col-span-4">useername</div>
      <div class="col-span-8">{{ user.username }}</div>
      <div class="col-span-4">氏名</div>
      <div class="col-span-8">{{ user.name }}</div>
      <div class="col-span-4">権限</div>
      <div class="col-span-8">{{ UserUtil.getAuthorityName(user) }}</div>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <div></div>
        <div>
          <el-button @click="_visible = false">閉じる</el-button>
          <el-button type="primary" @click="edit">編集</el-button>
        </div>
      </div>
    </template>

    <UserEditDialog v-model:visible="visibleEdit" :user="user" @updated="updatedUser" />
  </Dialog>
</template>
<script setup lang="ts">
import { User } from '~~/openapi';
import { AUTHORITY, AuthorityInfo } from '~~/shared/constants/authorities';
import { UserUtil } from '~~/shared/utils/user';

const { visible, user } = defineProps<{ visible: boolean; user: User }>();
const emit = defineEmits(['update:visible', 'update:task', 'updated']);

const visibleEdit = ref(false);

const edit = () => {
  visibleEdit.value = true;
};

const getAuthorityName = (user: User) => {
  const authorityId = user.authority as AUTHORITY;
  const auth = AuthorityInfo[authorityId];
  return auth?.name;
};

const _visible = computed({
  get: () => visible,
  set: (value: boolean) => emit('update:visible', value),
});

const updatedUser = (user: User) => {
  // emit('update:visible', false);
  emit('update:visible', user);
  emit('updated', user);
};
</script>

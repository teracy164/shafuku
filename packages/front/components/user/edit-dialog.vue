<template>
  <Dialog :visible="visible" @update:visible="_visible = false">
    <template #header> ユーザー登録 </template>
    <div class="contents">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" status-icon>
        <el-form-item label="username" prop="username">
          <el-input v-model="form.username" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="氏名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="権限" prop="authority">
          <el-select v-model="form.authority">
            <el-option v-for="item of selectAuthorities" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-button v-if="!visiblePassword" type="warning" @click="visiblePassword = true"> パスワードを変更 </el-button>
        <el-form-item v-show="visiblePassword" label="パスワード" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="_visible = false">閉じる</el-button>
      <el-button type="primary" @click="save(formRef)">保存</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { FormInstance, FormRules, ElMessage } from 'element-plus';
import { CreateUserDto, User } from '~~/openapi';
import { AUTHORITY, AuthorityInfo } from '~~/shared/constants/authorities';

const { visible, user } = defineProps<{ visible: boolean; user?: User }>();
const emit = defineEmits(['closed', 'update:visible', 'updated']);

const isEdit = !!user;
const visiblePassword = ref(!isEdit);
const formRef = ref<FormInstance>();
const form = reactive({
  username: null,
  name: null,
  authority: AUTHORITY.GENERAL,
  password: null,
});

const rules = reactive<FormRules>({
  username: isEdit ? [] : [{ required: true, message: '必須です', trigger: 'blur' }],
  name: [{ required: true, message: '必須です', trigger: 'blur' }],
  authority: [{ required: true, message: '必須です', trigger: 'blur' }],
});

if (isEdit) {
  form.username = user.username;
  form.name = user.name;
  form.authority = user.authority;
}

const selectAuthorities = Object.keys(AuthorityInfo).map((key) => {
  const authorityId = Number(key) as AUTHORITY;
  return {
    value: authorityId,
    label: AuthorityInfo[authorityId].name,
  };
});

const _visible = computed({
  get: () => visible,
  set: (value: boolean) => emit('update:visible', value),
});

const save = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  const isValid = await formEl.validate();
  if (!isValid) {
    ElMessage({ message: '入力エラー', type: 'error' });
    return;
  }

  const { $api } = useNuxtApp();

  const dto: CreateUserDto = {
    user: {
      username: form.username,
      name: form.name,
      authority: form.authority,
    },
    password: form.password,
  };

  let result: User;
  if (isEdit) {
    result = await $api.updateUser({ id: user.id, updateUserDto: dto });
  } else {
    result = await $api.addUser({ createUserDto: dto });
  }

  emit('update:visible', false);
  emit('updated', result);

  // TODO めんどうなので画面リロードする
  location.reload();
};
</script>
<style lang="scss">
.rewards {
  .el-input-group__prepend {
    padding: 0 5px;
  }
}
</style>

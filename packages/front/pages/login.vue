<template>
  <div class="h-full flex justify-center items-center">
    <el-card class="w-96">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="6em" status-icon>
        <el-form-item label="Username" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
      </el-form>
      <p>※test/testでログインできます</p>
      <div style="display: flex; justify-content: right">
        <el-button type="primary" @click="login(ruleFormRef)">login</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules } from 'element-plus';

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  username: '',
  password: '',
});

const rules = reactive<FormRules>({
  username: [{ required: true, message: '必須です', trigger: 'blur' }],
  password: [{ required: true, message: '必須です', trigger: 'blur' }],
});

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  try {
    const isValid = await formEl.validate();
    if (!isValid) {
      ElMessage({ message: '入力内容を確認してください', type: 'error' });
      return;
    }

    const { $auth } = useNuxtApp();
    await $auth.login(ruleForm);
    location.href = '/';
  } catch (err) {
    console.warn(err);
    ElMessage({ message: 'ログインに失敗しました', type: 'error' });
  }
};
</script>

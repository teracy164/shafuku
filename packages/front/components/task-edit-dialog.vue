<template>
  <Dialog :visible="visible" @update:visible="_visible = false">
    <template #header> タスク登録 </template>
    <div class="contents">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
        <el-form-item label="タイトル" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="依頼主" prop="orderer">
          <el-input v-model="form.orderer" />
        </el-form-item>
        <el-form-item label="内容" prop="contents">
          <el-input v-model="form.contents" :rows="5" type="textarea" />
        </el-form-item>
        <el-form-item label="日付" prop="date">
          <template #label>
            <div>
              <p style="line-height: 1em; text-align: right">日付</p>
              <el-checkbox v-model="isPeriodRef" label="期間" style="height: unset" />
            </div>
          </template>
          <template v-if="isPeriodRef">
            <el-date-picker v-model="form.startDate" type="date" placeholder="開始日" style="width: 10em" />
            <el-date-picker v-model="form.endDate" type="date" placeholder="終了日" style="width: 10em" />
          </template>
          <template v-else>
            <el-date-picker v-model="form.endDate" type="date" placeholder="実施日" style="width: 10em" />
          </template>
        </el-form-item>
        <el-form-item label="報酬" prop="rewards">
          <el-input v-model="form.rewards" type="number" class="rewards" style="width: 10em">
            <template #prepend>
              <GoogleIcon icon="currency_yen" style="font-size: 1em" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="募集人数" prop="numOfRecruit">
          <el-input v-model="form.numOfRecruit" type="number" style="width: 6em" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="_visible = false">閉じる</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { dayjs, FormInstance, FormRules } from 'element-plus';
import cloneDeep from 'lodash/cloneDeep';
import { Task } from '~~/openapi';

const { visible, task } = defineProps<{ visible: boolean; task?: Task | null }>();
const emit = defineEmits(['closed', 'update:visible', 'updated']);

const isPeriodRef = ref(false);
const formRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  title: [{ required: true, message: '必須です', trigger: 'blur' }],
  orderer: [{ required: true, message: '必須です', trigger: 'blur' }],
  numOfRecruit: [
    { required: true, message: '必須です', trigger: 'blur' },
    { min: 1, message: '数値を入力してください', trigger: 'blur' },
  ],
});
const form = reactive<Task>({
  id: undefined,
  title: '',
  contents: '',
  startDate: '',
  endDate: '',
  orderer: '',
  numOfRecruit: 1,
  rewards: 0,
});

if (task) {
  Object.assign(form, task);
}

const _visible = computed({
  get: () => visible,
  set: (value: boolean) => emit('update:visible', value),
});

const save = async () => {
  const { $api } = useNuxtApp();

  const data: Task = cloneDeep(form);

  if (isPeriodRef.value) {
    data.startDate = form.startDate ? dayjs(data.startDate).format('YYYY/MM/DD') : '';
  } else {
    data.startDate = '';
  }
  data.endDate = dayjs(data.endDate).format('YYYY/MM/DD');

  let result: Task;
  if (task) {
    result = await $api.updateTask({ id: task.id, task: data });
  } else {
    result = await $api.addTask({ task: data });
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

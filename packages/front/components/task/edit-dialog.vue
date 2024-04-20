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

        <div class="p-5">
          <div class="relative border p-5">
            <label class="absolute top-[-1em] bg-white px-2">
              <el-switch v-model="isPeriodRef" active-text="期間" inactive-text="日付" @change="changeSwitch(formRef)" />
            </label>

            <div class="flex items-center">
              <el-form-item v-if="isPeriodRef" prop="period">
                <el-date-picker v-model="form.period.startDate" type="date" placeholder="開始日" style="width: 10em" label-width="0px" />
                <el-date-picker v-model="form.period.endDate" type="date" placeholder="終了日" style="width: 10em" label-width="0px" />
              </el-form-item>
              <el-form-item v-else prop="date" :rules="{ required: true, message: '必須です', trigger: 'blur' }">
                <el-date-picker v-model="form.date" type="date" placeholder="実施日" style="width: 10em" label-width="0px" />
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="_visible = false">閉じる</el-button>
      <el-button type="primary" @click="save(formRef)">保存</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { dayjs, FormInstance, FormRules, ElMessage } from 'element-plus';
import { Task } from '~~/openapi';

const { visible, src } = defineProps<{ visible: boolean; src?: Task | null }>();
const emit = defineEmits(['closed', 'update:visible', 'updated']);

interface Form extends Task {
  period: {
    startDate: Date;
    endDate: Date;
  };
  date: Date;
}

const isPeriodRef = ref(false);
const formRef = ref<FormInstance>();
const form = reactive<Form>({
  id: undefined,
  title: '',
  contents: '',
  startDate: '',
  endDate: '',
  orderer: '',
  numOfRecruit: 1,
  rewards: 0,
  period: {
    startDate: null,
    endDate: null,
  },
  date: null,
});

const validateDate = (rule: any, value: any, callback: any) => {
  if (!form.period.startDate || !form.period.endDate) {
    callback(new Error('日付を入力して下さい'));
    return;
  }
  if (dayjs(form.period.startDate).isAfter(form.period.endDate)) {
    callback(new Error('開始日は終了日以前を指定してください'));
    return;
  }
  callback();
};

const rules = reactive<FormRules>({
  title: [{ required: true, message: '必須です', trigger: 'blur' }],
  orderer: [{ required: true, message: '必須です', trigger: 'blur' }],
  numOfRecruit: [{ required: true, message: '必須です', trigger: 'blur' }],
  period: [{ validator: validateDate, trigger: 'blur' }],
  // date: [{ required: true, message: '必須です', trigger: 'blur' }],
});

if (src) {
  Object.assign(form, src);

  isPeriodRef.value = !!src.startDate;
  if (isPeriodRef.value) {
    form.period.startDate = dayjs(src.startDate).toDate();
    form.period.endDate = dayjs(src.endDate).toDate();
  } else {
    form.date = dayjs(src.endDate).toDate();
  }
}

const _visible = computed({
  get: () => visible,
  set: (value: boolean) => emit('update:visible', value),
});

const changeSwitch = (formEl: FormInstance | undefined) => {
  formEl?.clearValidate();
};

const save = async (formEl: FormInstance | undefined) => {
  console.log('save', src, form);
  if (!formEl) return;

  const isValid = await formEl.validate();
  if (!isValid) {
    ElMessage({ message: '入力エラー', type: 'error' });
    return;
  }

  const { $api } = useNuxtApp();

  const { period, date, ...task } = form;
  const data: Task = task;

  if (isPeriodRef.value) {
    data.startDate = period.startDate ? dayjs(period.startDate).format('YYYY/MM/DD') : '';
    data.endDate = dayjs(period.endDate).format('YYYY/MM/DD');
  } else {
    data.startDate = '';
    data.endDate = dayjs(date).format('YYYY/MM/DD');
  }

  let result: Task;
  if (src) {
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

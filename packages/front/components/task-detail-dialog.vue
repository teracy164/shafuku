<template>
  <Dialog :visible="visible" @update:visible="_visible = false">
    <template #header>
      <div class="border-b-[1px] border-solid b-color-gray-300">
        <p class="text-xl">{{ task.title }}</p>
        <p class="flex items-center py-1">
          <GoogleIcon icon="account_circle" class="text-base pr-1" />
          <span class="text-xs">{{ task.orderer }}</span>
        </p>
      </div>
    </template>
    <div class="contents">
      <div class="mb-10 overflow">
        <pre class="whitespace-pre-wrap" style="font: inherit; max-height: 100%; overflow-y: auto">{{ task.contents }}</pre>
      </div>
      <div class="flex">
        <div class="flex items-center mr-4">
          <GoogleIcon icon="payments" class="text-base pr-2" />
          <span class="text-sm">{{ $currency(task.rewards) }}</span>
        </div>
        <div class="flex items-center">
          <GoogleIcon icon="group" class="text-base pr-2" />
          <span class="text-sm">{{ task.assigners?.length || 0 }}/{{ task.numOfRecruit }}</span>
        </div>
      </div>

      <div class="flex items-center">
        <GoogleIcon icon="event" class="text-base pr-2" />
        <span class="text-sm">
          <span v-if="task.startDate"> {{ task.startDate }}～ </span>
          {{ task.endDate }}
        </span>
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between">
        <div>
          <el-button type="warning" v-if="isCancelable" @click="calcelTask">キャンセルする</el-button>
        </div>
        <div>
          <el-button @click="_visible = false">閉じる</el-button>
          <el-button type="primary" @click="edit">編集</el-button>
          <el-button type="primary" v-if="isAcceptable" @click="acceptTask">受領する</el-button>
        </div>
      </div>
    </template>

    <TaskEditDialog v-model:visible="visibleEdit" :task="task" @updated="updatedTask" />
  </Dialog>
</template>
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { Task } from '~~/openapi';

const { $auth, $api } = useNuxtApp();

const { visible, task } = defineProps<{ visible: boolean; task: Task }>();
const emit = defineEmits(['update:visible', 'update:task', 'updated']);

const isAssigned = task?.assigners?.some((a) => a.id === $auth.loginUser.id);
const isAcceptable = !isAssigned;
const isCancelable = isAssigned;

const visibleEdit = ref(false);

const edit = () => {
  visibleEdit.value = true;
};

const _visible = computed({
  get: () => visible,
  set: (value: boolean) => emit('update:visible', value),
});

const updatedTask = (task: Task) => {
  // emit('update:visible', false);
  emit('update:visible', task);
  emit('updated', task);
};

const acceptTask = async () => {
  const result = await $api.addTaskAssigner({ taskId: task.id, requestBody: [$auth.loginUser.id] });

  ElMessage({ message: '受領しました' });
  // めんどくさいからリロードする
  location.reload();
};

const calcelTask = async () => {
  try {
    const result = await ElMessageBox.confirm(`${task.title}をキャンセルしてよろしいですか？`, '確認');
    if (result) {
      const loginUserId = $auth.loginUser.id;
      $api.deleteTaskAssigner({ taskId: task.id, assignUserId: loginUserId });
      // めんどくさいからリロードする
      location.reload();
    }
  } catch (err) {
    // nop
  }
};
</script>

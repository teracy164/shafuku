<template>
  <div>
    <div class="mb-10">
      <label class="my-headline text-xl">報酬履歴</label>
      <BarChart v-if="visibleChart" style="max-height: 200px" :chart-data="rewards" />
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-8">
        <label class="my-headline text-xl">受領中タスク</label>
        <div v-if="myTasks.length" class="flex flex-wrap">
          <TaskCard v-for="task of myTasks" :task="task" class="cursor-pointer hover:bg-blue-50" @click="showDetail(task)" />
        </div>
        <div v-else class="p-2">なし</div>
      </div>
      <div class="col-span-4">
        <label class="my-headline text-xl">マイアクティビティ</label>
        <div>
          <ul>
            <li>2022/09/30 YYYを完了</li>
            <li>2022/09/15 YYYを受領</li>
            <li>2022/08/17 ●●さんがXXXを完了</li>
            <li>2022/08/15 ●●さんがXXXを受領</li>
          </ul>
        </div>
      </div>
    </div>
    <TaskDetailDialog v-if="dialog.visible" v-model:visible="dialog.visible" v-model:task="dialog.task" @updated="updatedTask" />
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { BarChart } from 'vue-chart-3';
import { Task } from '~~/openapi';
import { TASK_STATUS } from '~~/shared/constants/status';

const visibleChart = ref(false);
const dialog = reactive<{ visible: boolean; task: Task }>({
  visible: false,
  task: null,
});
const chartLabels: string[] = [];
const chartData: number[] = [];

const rewards = {
  labels: chartLabels,
  datasets: [
    {
      label: '報酬',
      data: chartData,
      backgroundColor: ['#669'],
    },
  ],
};

const { $api, $auth } = useNuxtApp();
const result = await $api.getTasks({ userId: $auth.loginUser.id });
const myTasks = result.filter((task) => !(task.lastStatus?.status === TASK_STATUS.COMPLETE));

// 報酬の集計
for (let i = 0; i < 12; i++) {
  const month = i + 1;
  chartLabels.push(`${month}月`);

  const dMonth = dayjs().month(month - 1);
  const tmpTasks = myTasks.filter((t) => dMonth.isSame(t.endDate, 'month'));
  const rewards = tmpTasks.reduce((sum, t) => sum + t.rewards, 0);
  chartData.push(rewards);
}

const showDetail = (task: Task) => {
  dialog.task = task;
  dialog.visible = true;
};

const updatedTask = () => {
  // TODO めんどうなので画面リロード
  location.reload();
};

onMounted(() => {
  visibleChart.value = true;
});

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});
</script>

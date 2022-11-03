<template>
  <div>
    <div class="mb-10">
      <label class="my-headline text-xl">報酬履歴</label>
      <BarChart v-if="visibleChart" style="max-height: 200px" :chart-data="rewards" />
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-8">
        <label class="my-headline text-xl">受領中タスク</label>
        <div class="flex flex-wrap">
          <TaskCard v-for="task of myTasks" :task="task" />
        </div>
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
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { BarChart } from 'vue-chart-3';
import { Task } from '~~/openapi';

const visibleChart = ref(false);
const chartLabels: string[] = [];
const chartData: number[] = [];

const rewards = {
  labels: chartLabels,
  datasets: [
    {
      data: chartData,
      backgroundColor: ['#669'],
    },
  ],
};

const { $api, $auth } = useNuxtApp();
const myTasks = await $api.getTasks({ userId: $auth.loginUser.id });

// 報酬の集計
for (let i = 0; i < 12; i++) {
  const month = i + 1;
  chartLabels.push(`${month}月`);

  const dMonth = dayjs().month(month - 1);
  const tmpTasks = myTasks.filter((t) => dMonth.isSame(t.endDate, 'month'));
  const rewards = tmpTasks.reduce((sum, t) => sum + t.rewards, 0);
  chartData.push(rewards);
}

onMounted(() => {
  visibleChart.value = true;
});

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});
</script>

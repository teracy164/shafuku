<template>
  <div>
    <div class="mb-10">
      <label class="my-headline text-xl">報酬履歴</label>
      <BarChart v-if="visibleChart" style="max-height: 200px" :chart-data="rewards" />
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-8">
        <label class="my-headline text-xl">受領中タスク</label>
        <TaskCard v-for="task of mytasks" :task="task" />
      </div>
      <div class="col-span-4">
        <label class="my-headline text-xl">マイアクティビティ</label>
        <div>
          <ul>
            <li>2022/10/01 XXXを受領</li>
            <li>2022/09/15 XXXを完了</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BarChart } from 'vue-chart-3';
import { Task } from '~~/openapi';

const visibleChart = ref(false);
const chartLabels: string[] = [];
const chartData: number[] = [];
for (let i = 0; i < 12; i++) {
  chartLabels.push(`${i + 1}月`);
  chartData.push(i);
}

const rewards = {
  labels: chartLabels,
  datasets: [
    {
      data: chartData,
      backgroundColor: ['#669'],
    },
  ],
};

const mytasks: Task[] = [{ title: 'test', contents: 'test', endDate: '2022/10/31', orderer: 'soumu', numOfRecruit: 1, rewards: 1000 }];

onMounted(() => {
  visibleChart.value = true;
});

definePageMeta({
  layout: 'authenticated',
  middleware: ['auth'],
});
</script>

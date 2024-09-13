<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs';
import summary_cities from '~~/resources/summary_cities.json';

// state
const chartInitialized = ref(false);

// computed
const citiesLabels = Object.keys(summary_cities);
const citiesDatasets = Object.keys(summary_cities).map((e) => {
  return summary_cities[e];
});

// lifecycle
onNuxtReady(async () => {
  const {
    Chart: ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
  } = await import('chart.js');

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
  );
  chartInitialized.value = true;
});
</script>

<template>
  <div v-if="chartInitialized">
    <v-alert
      class="mt-4"
      type="warning"
      text="Dữ liệu được tổng hợp dựa theo nội dung chuyển khoản, chỉ mang tính chất tham khảo."
    />

    <v-card class="mt-4">
      <v-card-title> Tỉnh thành </v-card-title>
      <v-card-text>
        <Bar
          id="rc"
          :options="{
            responsive: true,
          }"
          :data="{
            labels: citiesLabels,
            datasets: [
              {
                data: citiesDatasets,
                label: 'Số tiền đóng góp',
                backgroundColor: '#2196f3',
              },
            ],
          }"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

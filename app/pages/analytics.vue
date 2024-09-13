<script setup lang="ts">
import { Bar, Line } from 'vue-chartjs';
import summary_byday from '~~/resources/summary_byday.json';
import summary_cities from '~~/resources/summary_cities.json';

// uses
const device = useDevice();
const window = useWindowSize();

// state
const chartInitialized = ref(false);

// computed
const citiesLabels = Object.keys(summary_cities);
const citiesDatasets = Object.keys(summary_cities).map((e) => {
  return summary_cities[e];
});

const bydayLabebls = Object.keys(summary_byday);
const bydayDatasets = Object.keys(summary_byday).map((e) => {
  return summary_byday[e];
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
      <v-card-text
        :style="
          device.isDesktop
            ? `height: ${window.width.value * 0.3}px;`
            : undefined
        "
      >
        <Bar
          id="rc"
          :options="{
            responsive: true,
            maintainAspectRatio: device.isMobile,
            scales: {
              x: {
                ticks: {
                  autoSkip: false,
                },
              },
            },
          }"
          :data="{
            labels: citiesLabels,
            datasets: [
              {
                data: citiesDatasets,
                label: 'Số tiền',
                backgroundColor: '#2196f3',
              },
            ],
          }"
        />
      </v-card-text>
    </v-card>

    <!-- byday -->
    <v-card class="mt-2">
      <v-card-title> Theo ngày </v-card-title>
      <v-card-text
        :style="
          device.isDesktop
            ? `height: ${window.width.value * 0.3}px;`
            : undefined
        "
      >
        <Line
          :options="{
            maintainAspectRatio: device.isMobile,
            responsive: true,
          }"
          :data="{
            labels: bydayLabebls,
            datasets: [
              {
                label: 'Số tiền',
                backgroundColor: '#2196f3',
                borderColor: '#2196f3',
                data: bydayDatasets,
              },
            ],
          }"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { mdiMagnify } from '@mdi/js';

import type { IResponse } from '~/interface/api';
import type { ITransaction } from '~/interface/tranasction';

const limit = ref(25);
const search = ref();
const searchField = ref();
const searchDebounce = useDebounceFn(() => {
  search.value = searchField.value;
}, 500);
let abortController: AbortController;

// states
const loading = ref(true);
const data = ref<IResponse<ITransaction>>();

// computed
const total = computed(() => {
  if (data.value) {
    return data.value.total;
  }
  return 0;
});

const items = computed(() => {
  if (data.value) {
    return data.value.items;
  }
  return [];
});

const headers = [
  {
    title: 'Ngày',
    width: '10%',
    key: 'date',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Số tiền',
    width: '10%',
    key: 'amount',
    align: 'center',
    sortable: true,
  },
  { title: 'Nội dung', key: 'detail', align: 'left', sortable: false },
] as any[];

// functions
const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  if (abortController) abortController.abort();
  abortController = new AbortController();

  loading.value = true;
  axios
    .get('/api/transactions', {
      params: {
        limit: itemsPerPage,
        offset: page * itemsPerPage - itemsPerPage,
        sortBy: JSON.stringify(sortBy),
        search: search.value,
      },
      signal: abortController.signal,
    })
    .then((response) => {
      data.value = response.data as any;
      loading.value = false;
    });
};

// watch
watch(
  () => searchField.value,
  () => searchDebounce(),
);
</script>

<template>
  <div>
    <div class="mt-4">
      <v-text-field
        v-model="searchField"
        variant="solo"
        placeholder="Tìm kiếm theo nội dung chuyển khoản"
        :prepend-inner-icon="mdiMagnify"
        :clearable="true"
        :hide-details="true"
      />
    </div>

    <client-only>
      <v-card class="mt-4">
        <v-data-table-server
          :items-per-page="limit"
          :search
          :loading
          :headers="headers"
          :items
          :items-length="total"
          :items-per-page-options="[25, 50, 100]"
          @update:options="loadItems"
        >
          <template #item.amount="{ item }">
            {{ formatNumber(item.amount) }}
          </template>

          <template #item.detail="{ item }">
            <span :innerHTML="highlightText(item.detail, search)"></span>
          </template>
        </v-data-table-server>
      </v-card>
    </client-only>
  </div>
</template>

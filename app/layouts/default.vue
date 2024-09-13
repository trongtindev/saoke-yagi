<script setup lang="ts">
import {
  mdiHome,
  mdiChartBar,
  mdiGithub,
  mdiMenuClose,
  mdiMenuOpen,
} from '@mdi/js';

// states
const drawer = ref();
</script>

<template>
  <v-app>
    <v-app-bar :elevation="0" class="border-b">
      <v-app-bar-nav-icon
        :icon="drawer ? mdiMenuOpen : mdiMenuClose"
        @click="drawer = !drawer"
      />

      <v-app-bar-title> Sao kê đóng góp bão số 3 Yagi </v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list :nav="true" :lines="false">
        <v-list-item to="/" title="Trang chủ" :prepend-icon="mdiHome" />
        <v-list-item
          to="/analytics"
          title="Thống kê"
          :prepend-icon="mdiChartBar"
        />
      </v-list>

      <template #append>
        <v-divider />
        <v-list :nav="true" :lines="false">
          <v-list-item
            rounded
            href="https://github.com/trongtindev/saoke-yagi"
            target="_blank"
            title="Github"
            :prepend-icon="mdiGithub"
            :active="false"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container :fluid="true">
        <v-alert type="info">
          Theo danh sách công bố từ MTTQVN từ 1/9/2024 đến ngày 10/09/2024!
          Chúng tôi sẽ cập nhật khi có dữ liệu mới từ MTTQ.
        </v-alert>

        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

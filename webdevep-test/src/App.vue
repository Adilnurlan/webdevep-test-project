<script setup>
import Layout from '@/components/Layout.vue';
import Toast from 'primevue/toast';
import Spinner from '@/components/Spinner.vue';
import { useAuthStore } from '@/store/authStore.js';

const authStore = useAuthStore();
</script>
<template>
  <header class="mainWrapper">
    <Layout />
  </header>
  <main>
    <div class="divCenter">
      <router-view></router-view>
    </div>
  </main>
  <Toast />
  <Spinner v-if="authStore.isLoading" />
</template>

<style scoped>
.divCenter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

.mainWrapper {
  /* display: flex;
  justify-content: center; */
  margin-bottom: 50px;
}
</style>

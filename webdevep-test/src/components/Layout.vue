<template>
    <div class="card">
        <Menubar :model="items">
            <template v-if="authStore.accessToken" #end>
                <Button @click="logoutBtn" label="Logout" icon="pi pi-sign-out" />
            </template>
        </Menubar>
    </div>
</template>
<script setup>
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import { ref, watch, computed } from "vue";
import 'primeicons/primeicons.css';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore.js';

const router = useRouter();
const authStore = useAuthStore();

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push('/');
        }
    }
]);

const logoutBtn = () => {
    authStore.logout({ refreshToken: localStorage.getItem('refreshToken') })
}
</script>
<style scoped></style>
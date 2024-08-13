<template>
    <Card style="width: 25rem; overflow: hidden">
        <template #title>
            <div class="card flex justify-center mb-3">
                <slot name="switchBtn"></slot>
            </div>
        </template>
        <template #content>
            <form ref="authForm" @submit.prevent.stop="submitForm">
                <slot name="credential"></slot>
                <div class="flex items-center gap-4 mb-8">
                    <label class="font-semibold w-24">Пароль</label>
                    <Password v-model="password" :feedback="false" :disabled="authStore.isLoading" required
                        toggleMask />
                </div>
                <div class="flex gap-4 mt-1">
                    <slot name="submitBtn"></slot>
                </div>
            </form>
        </template>
    </Card>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const authForm = ref();
const password = ref(null);
const router = useRouter();
const authStore = useAuthStore();

const submitForm = () => {
    const currentRoute = router.currentRoute.value.path;
    console.log(currentRoute)
    const formData = new FormData(authForm.value);
    formData.append('password', password.value)
    if (currentRoute.includes('register')) {
        console.log([...formData])
        authStore.register(formData);
    }
    if (currentRoute.includes('login')) {
        authStore.login(formData);
    }
    password.value = null;
    authForm.value.reset();
}
</script>

<style scoped></style>
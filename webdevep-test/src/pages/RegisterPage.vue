<template>
    <AuthForm>
        <template #switchBtn>
            <SelectButton v-model="selected" :options="options" aria-labelledby="basic" />
        </template>
        <template #credential>
            <div class="flex items-center gap-4 mb-4">
                <label for="email" class="font-semibold w-24">Почта</label>
                <InputText id="email" type="email" name="email" class="flex-auto" autocomplete="off" required
                    :disabled="authStore.isLoading" />
            </div>
        </template>
        <template #submitBtn>
            <Button type="submit" label="Регистрация" icon="pi pi-check" class="w-full"
                :loading="authStore.isLoading" />
        </template>
    </AuthForm>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import AuthForm from '@/components/AuthForm.vue';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useAuthStore } from '@/store/authStore';

const selected = ref('Регистрация');
const options = ref(['Вход', 'Регистрация']);

const authStore = useAuthStore();
const router = useRouter();

watch(selected, (newVal) => {
    if (newVal === 'Вход') {
        router.push({ name: 'authorization' })
    }
})
</script>

<style scoped></style>
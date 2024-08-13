<template>
    <div class="flex flex-col">
        <p>Hello this is home Page!!!</p>
        <div class="card flex gap-4 justify-center">
            <Button v-if="!isAuthenticated" as="router-link" to="/login" label="Вход" />
            <Button v-if="!isAuthenticated" as="router-link" to="/register" label="Регистрация" />
        </div>
    </div>


</template>
<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';

const isAuthenticated = ref(localStorage.getItem('accessToken'))

</script>
<style scoped></style>
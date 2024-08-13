<template>
    <div class="spinner">
        <i class="pi pi-spin pi-spinner" style="font-size: 4rem"></i>
    </div>
</template>
<script setup>

</script>
<style scoped>
.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 9999;
}
</style>
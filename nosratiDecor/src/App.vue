<script setup>
import { RouterView } from 'vue-router'
import Preloader from './components/Preloader.vue'
import MainInitializer from './components/MainInitializer.vue'
</script>

<template>
  <Preloader />
  <MainInitializer />
  <RouterView />
</template>

<style>
/* استایل‌های عمومی اپلیکیشن در صورت نیاز */
</style>

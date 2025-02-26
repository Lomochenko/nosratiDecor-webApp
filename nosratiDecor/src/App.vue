<script setup>
import { RouterView } from 'vue-router'

import Header from './components/FixHeader.vue'
import Footer from './components/FixFooter.vue'

</script>

<template>
  <Header />
  <main class="main-root">
    <div id="dsn-scrollbar">
      
      <RouterView />
      <Footer />
    </div>
  </main>

</template>

<style>
/* @import '@/assets/css/plugins/bootstrap-grid.min.css'; */
/* @import '@/assets/css/plugins/fontawesome-all.min.css';
@import '@/assets/css/plugins/animate.css';
@import '@/assets/css/plugins/slick.css';
@import '@/assets/css/plugins/swiper.min.css';
@import '@/assets/css/plugins/aos.css';
@import '@/assets/css/plugins/justifiedGallery.min.css';
@import '@/assets/css/plugins/magnific-popup.css';
@import '@/assets/css/plugins/youtubepopup.css'; */
/* @import '/bootstrap/dist/css/bootstrap-grid.min.css'; */
/* @import '@/assets/css/style.css'; */
</style>

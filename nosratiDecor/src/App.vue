<script setup>
import { RouterView } from 'vue-router'

import Header from './components/FixHeader.vue'
import Animation from './components/FixAnimation.vue'
import Footer from './components/FixFooter.vue'

</script>

<template>
  <Header />
  <main class="main-root">
    <div id="dsn-scrollbar">
      <div class="wrapper">
        <Animation />
      </div>
      <Footer />
    </div>
  </main>
  
  <RouterView />
</template>

<style>
/* @import '@/assets/css/plugins/fontawesome-all.min.css';
@import '@/assets/css/plugins/animate.css';
@import '@/assets/css/plugins/slick.css';
@import '@/assets/css/plugins/swiper.min.css';
@import '@/assets/css/plugins/aos.css';
@import '@/assets/css/plugins/justifiedGallery.min.css';
@import '@/assets/css/plugins/magnific-popup.css';
@import '@/assets/css/plugins/youtubepopup.css'; */

</style>

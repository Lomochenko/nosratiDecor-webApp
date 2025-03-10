<template>
    <div class="preloader">
      <div class="preloader-after"></div>
      <div class="preloader-before"></div>
      <div class="preloader-block">
        <div class="title">Nosrati Decor</div>
        <div class="percent">{{ percent }}</div>
        <div class="loading">loading...</div>
      </div>
      <div class="preloader-bar">
        <div class="preloader-progress" :style="{ width: percent + '%' }"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const percent = ref(0)
  
  const pageLoad = (start, end, duration) => {
    const loadTime = window.performance.timing
    const actualTime = (-1 * (loadTime.loadEventEnd - loadTime.navigationStart) / 1000) % 50 * 10
    const increment = end > start ? 1 : -1
    const stepTime = Math.abs(Math.floor((actualTime + duration) / 100))
  
    const interval = setInterval(() => {
      percent.value += increment
      if (percent.value >= end) {
        clearInterval(interval)
        handleLoadComplete()
      }
    }, stepTime)
  }
  
  const handleLoadComplete = () => {
    // انیمیشن‌های پایان لودینگ
    const preloader = document.querySelector('.preloader')
    const preloaderBlock = preloader.querySelector('.preloader-block')
    const title = preloaderBlock.querySelector('.title')
    const loading = preloaderBlock.querySelector('.loading')
    const percentEl = preloaderBlock.querySelector('.percent')
    const before = preloader.querySelector('.preloader-before')
    const after = preloader.querySelector('.preloader-after')
  
    // استفاده از GSAP برای انیمیشن‌ها
    gsap.to(title, {
      duration: 1,
      autoAlpha: 0,
      y: -100
    })
  
    gsap.to(loading, {
      duration: 1,
      autoAlpha: 0,
      y: 100
    })
  
    gsap.to(percentEl, {
      duration: 1,
      autoAlpha: 0
    })
  
    gsap.to(before, {
      duration: 1,
      y: '-100%',
      delay: 0.7
    })
  
    gsap.to(after, {
      duration: 1,
      y: '100%',
      delay: 0.7,
      onComplete: () => {
        preloader.classList.add('hidden')
      }
    })
  }
  
  onMounted(() => {
    window.addEventListener('load', () => {
      pageLoad(0, 100, 300)
    })
  })
  </script>
  
  <style scoped>
  /* استایل‌های موجود را حفظ کنید */
  </style>
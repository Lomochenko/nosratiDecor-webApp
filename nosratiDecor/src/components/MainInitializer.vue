<template>
    <div class="main-initializer">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  
  const initializeWebsite = () => {
    // اضافه کردن کلاس‌های لازم به body
    document.body.classList.add('hamburger-menu', 'dsn-effect-scroll', 'dsn-ajax')
    
    // راه‌اندازی background
    const backgroundElements = document.querySelectorAll('.cover-bg, section, [data-image-src]')
    backgroundElements.forEach(el => {
      const imageSrc = el.getAttribute('data-image-src')
      if (imageSrc) {
        el.style.backgroundImage = `url(${imageSrc})`
      }
    })
  
    // راه‌اندازی data overlay
    const overlayElements = document.querySelectorAll('[data-overlay-color]')
    overlayElements.forEach((el, index) => {
      const color = el.getAttribute('data-overlay-color')
      el.classList.add(`dsn-overlay-${index}`)
      
      // اضافه کردن استایل به head
      const style = document.createElement('style')
      style.textContent = `.dsn-overlay-${index}[data-overlay]:before{background: ${color};}`
      document.head.appendChild(style)
    })
  
    // بررسی حالت light
    const lightElement = document.querySelector('[data-dsn-temp="light"]')
    if (lightElement) {
      document.body.classList.add('v-light')
      const headerProject = document.querySelector('[data-dsn-header="project"]')
      if (!headerProject || headerProject.classList.contains('header-hero-2')) {
        document.body.classList.add('menu-light')
      }
    }
  }
  
  onMounted(() => {
    initializeWebsite()
  })
  </script>
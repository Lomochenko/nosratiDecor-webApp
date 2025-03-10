import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import gsap from 'gsap'

// Make gsap globally available
window.gsap = gsap

// Import CSS files
import '@/assets/css/plugins/bootstrap-grid.min.css'
import '@/assets/css/plugins/youtubepopup.css'
import '@/assets/css/plugins/swiper.min.css'
import '@/assets/css/plugins/animate.css'
import '@/assets/css/plugins/aos.css'
import '@/assets/css/plugins/fontawesome-all.min.css'
import '@/assets/css/plugins/slick.css'
import '@/assets/css/plugins/justifiedGallery.min.css'
import '@/assets/css/plugins/magnific-popup.css'

// Import main CSS files
import '@/assets/css/plugins.css'
import '@/assets/css/style.css'

const app = createApp(App)
app.use(router)
// Make gsap available in all components
app.config.globalProperties.$gsap = gsap
app.mount('#app')

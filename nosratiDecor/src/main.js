import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// after created all sections, change these sources with NPM INSTALATOIN
import './assets/css/plugins/bootstrap-grid.min.css';
import './assets/css/plugins/fontawesome-all.min.css';
import './assets/css/plugins/animate.css';
import './assets/css/plugins/slick.css';
import './assets/css/plugins/swiper.min.css';
import './assets/css/plugins/aos.css';
import './assets/css/plugins/justifiedGallery.min.css';
import './assets/css/plugins/magnific-popup.css';
import './assets/css/plugins/youtubepopup.css';
import './assets/css/style.css'

const app = createApp(App)

// app.use(createPinia())
app.use(router)

app.mount('#app')

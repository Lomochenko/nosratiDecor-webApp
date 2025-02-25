import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import $ from 'jquery';
// window.$= window.jQuery = $;

const app = createApp(App)

// app.use(createPinia())
app.use(router)

app.mount('#app')

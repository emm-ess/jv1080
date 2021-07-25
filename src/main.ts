import '@/sass/main.sass'

import {createApp} from 'vue'

import jv1080 from '@/vue-plugins/jv1080'

import App from './app.vue'

const app = createApp(App)
app.use(jv1080)
app.mount('#app')

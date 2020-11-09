import '@/sass/main.sass'

import {createApp} from 'vue'
import {registerGlobalComponents} from '@/globalComponents'

import App from './App.vue'

const app = createApp(App)
registerGlobalComponents(app)
app.mount('#app')

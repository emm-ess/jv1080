import '@/sass/main.sass'

import {createApp} from 'vue'
import {registerGlobalComponents} from '@/globalComponents'
import jv1080 from '@/vue-plugins/jv1080'

import App from './App.vue'

const app = createApp(App)
registerGlobalComponents(app)
app.use(jv1080)
app.mount('#app')

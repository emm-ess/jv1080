import type {App} from 'vue'
import {JV1080} from '@/helper'

export default {
    async install(app: App): Promise<void> {
        app.config.globalProperties.$jv1080 = JV1080
    },
}

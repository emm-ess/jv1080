import type {App} from 'vue'

import {JV1080} from '@/jv1080'

export default {
    async install(app: App): Promise<void> {
        app.config.globalProperties.$jv1080 = JV1080
    },
}

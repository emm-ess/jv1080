// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {ComponentCustomProperties} from 'vue'

import type {JV1080} from '@/helper'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $jv1080: JV1080
    }
}

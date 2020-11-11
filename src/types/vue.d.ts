import {ComponentCustomProperties} from 'vue'
import {JV1080} from '@/helper'

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $jv1080: JV1080
    }
}

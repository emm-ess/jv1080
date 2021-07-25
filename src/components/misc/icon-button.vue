<script lang="ts">
import type {VNode} from 'vue'
import {h} from 'vue'

import SvgSprite from './svg-sprite.vue'

export type IconButtonOptions = {
    type: string
    icon: string
    title: string
}

const IconButton = ({type, icon, title}: IconButtonOptions): VNode | VNode[] => {
    const childElements = [h(SvgSprite, {icon, title})]

    return h('button', {class: 'icon-button', type}, childElements)
}

IconButton.props = {
    type: {type: String, default: 'button'},
    icon: {type: String, required: true},
    title: {type: String, required: true},
}

export default IconButton
</script>

<style lang="sass">
.icon-button
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 40px
    height: 40px
    padding: 5px

    .svg-icon
        width: auto
        height: auto

.icon-button-notification
    position: absolute
    top: 0
    right: -6px
</style>

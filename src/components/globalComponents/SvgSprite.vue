<script lang="ts">
import {h, VNode} from 'vue'

export type SvgSpriteProps = {
    icon: string
    title?: string
}

const SvgSprite = (props: SvgSpriteProps): VNode | VNode[] => {
    const {icon, title} = props
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const iconFile = require(`@/assets/img/svg-sprite/${icon}.svg`)
    const iconPath = Object.prototype.hasOwnProperty.call(iconFile, 'default')
        ? iconFile.default.url
        : iconFile.url

    const children = title ? [h('title', title)] : []

    children.push(
        h('use', {
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            'xlink:href': iconPath,
        }),
    )

    const key = `svg-icon--${icon}`

    return h(
        'svg',
        {
            key,
            class: `svg-icon ${key}`,
            xmlns: 'http://www.w3.org/2000/svg',
        },
        children,
    )
}

SvgSprite.props = {
    icon: {type: String, required: true},
    title: {type: String},
}

export default SvgSprite
</script>

<style lang="sass">
.svg-icon
    width: 1.5em
    height: 1.5em
</style>

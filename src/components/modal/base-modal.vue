<template>
    <section class="modal-outer-wrapper" @click="close">
        <div class="modal-content">
            <icon-button class="button-close" title="schließen" icon="x" @click="close" />
            <header>
                <slot name="head" />
            </header>
            <main>
                <slot />
            </main>
        </div>
    </section>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'

@Options({
    emits: ['close'],
})
export default class BaseModal extends Vue {
    close(): void {
        this.$emit('close')
    }
}
</script>

<style lang="sass" scoped>
.modal-outer-wrapper
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    display: flex
    justify-content: center
    align-items: center
    background: rgba($black, 0.6)

.modal-content
    position: relative
    padding: 16px
    background: $white

header
    margin: 0 0 10px
    padding: 0 50px 10px 0
    // stylelint-disable-next-line color-named
    border-bottom: 1px solid $black

    :deep(h1)
        margin: 0

.button-close
    position: absolute
    top: 5px
    right: 5px
</style>

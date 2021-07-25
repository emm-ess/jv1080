<template>
    <header>
        <h1>Roland JV 1080 Editor</h1>

        <icon-button title="Einstellungen" icon="cog" @click="openSettings" />
    </header>
    <template v-if="!$jv1080.MIDI_SUPPORTED">
        <h2>Sorry</h2>
        <p>
            Your browser doesn't support WebMIDI which is essential for communicating with the JV
            1080.
        </p>
    </template>
    <modal-devices v-if="settingsOpen" v-model:open="settingsOpen" />
    <footer></footer>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'

import ModalDevices from '@/components/modal/modal-devices.vue'

@Options({
    components: {
        ModalDevices,
    },
})
export default class App extends Vue {
    ready = false
    settingsOpen = false

    async created(): Promise<void> {
        await this.$jv1080.enableMidi()
        this.ready = true
    }

    openSettings(): void {
        this.settingsOpen = true
    }
}
</script>

<style lang="sass">
header
    display: flex
    justify-content: space-between
</style>

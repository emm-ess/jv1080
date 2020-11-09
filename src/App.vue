<template>
    <header>
        <h1>Roland JV 1080 Editor</h1>
    </header>
    <template v-if="!midiSupported">
        <h2>Sorry</h2>
        <p>Your browser doesn't support WebMIDI which is essential for communicating with the JV 1080.</p>
    </template>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from './components/HelloWorld.vue'
import {hasMidiSupport} from '@/helper'

@Options({
    components: {
        HelloWorld,
    },
})
export default class App extends Vue {
    midiSupported = hasMidiSupport()
}
</script>

<style lang="sass">
// not empty
</style>

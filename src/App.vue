<template>
    <header>
        <h1>Roland JV 1080 Editor</h1>
    </header>
    <template v-if="!$jv1080.MIDI_SUPPORTED">
        <h2>Sorry</h2>
        <p>Your browser doesn't support WebMIDI which is essential for communicating with the JV 1080.</p>
    </template>
    <template v-else>
        <jv-select v-model="input" :options="{id: 'input-device', itemTitle: 'name', itemValue: 'id', returnItemAsValue: true}" :items="$jv1080.availablePorts.inputs">Eingabe-Geräte</jv-select>
        <jv-select v-model="output" :options="{id: 'output-device', itemTitle: 'name', itemValue: 'id', returnItemAsValue: true}" :items="$jv1080.availablePorts.outputs">Ausgabe-Geräte</jv-select>

        <button class="button-primary" :disabled="!(input && output)" @click="test">set & test</button>
    </template>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import JvSelect from '@/components/form/JvSelect.vue'

@Options({
    components: {
        JvSelect,
    },
})
export default class App extends Vue {
    input: WebMidi.MIDIInput | null = null
    output: WebMidi.MIDIOutput | null = null

    created(): void {
        this.$jv1080.enableMidi()
    }

    async test(): Promise<void> {
        await this.$jv1080.setPorts({
            input: this.input,
            output: this.output,
        })
        await this.$jv1080.playTest()
    }
}
</script>

<style lang="sass">
// not empty
</style>

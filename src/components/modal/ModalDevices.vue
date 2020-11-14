<template>
    <base-modal @close="close">
        <template #head>
            <h1>Geräteeinstellungen</h1>
        </template>
        <jv-select
            v-model="input"
            :options="{
                id: 'input-device',
                itemTitle: 'name',
                itemValue: 'id',
                returnItemAsValue: true,
            }"
            :items="$jv1080.availablePorts.inputs"
            >Eingabe-Geräte</jv-select
        >
        <div class="form-row">
            <jv-select
                v-model="output"
                class="output-device"
                :options="{
                    id: 'output-device',
                    itemTitle: 'name',
                    itemValue: 'id',
                    returnItemAsValue: true,
                }"
                :items="$jv1080.availablePorts.outputs"
                >Ausgabe-Geräte</jv-select
            ><icon-button
                class="button-play-test"
                title="Testmelodie spielen"
                icon="music"
                @click="playTest"
            />
        </div>

        <button class="button-primary" :disabled="!(input && output)" @click="save">
            speichern
        </button>
    </base-modal>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import {PropSync} from 'vue-property-decorator'

import BaseModal from './BaseModal.vue'
import JvSelect from '@/components/form/JvSelect.vue'

@Options({
    components: {
        BaseModal,
        JvSelect,
    },
    emits: ['update:open'],
})
export default class ModalDevices extends Vue {
    @PropSync('open')
    innerOpen!: boolean

    input: WebMidi.MIDIInput | null = null
    output: WebMidi.MIDIOutput | null = null

    created(): void {
        const {input, output} = this.$jv1080.portsInUse
        this.input = input
        this.output = output
    }

    async playTest(): Promise<void> {
        await this.$jv1080.playTest(this.output)
    }

    async save(): Promise<void> {
        await this.$jv1080.setPorts({
            input: this.input,
            output: this.output,
        })
        this.close()
    }

    close(): void {
        this.innerOpen = false
    }
}
</script>

<style lang="sass" scoped>
.form-row
    display: flex

.output-device
    flex: 1 0 auto
</style>

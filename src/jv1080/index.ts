import {sleep} from '@/helper'
import {ref, reactive, readonly} from 'vue'
import {MIDI_STATUS_BYTE} from './const'

console.log(MIDI_STATUS_BYTE)

const MIDI_SUPPORTED = !!navigator.requestMIDIAccess
const enabled = ref(false)
const connected = ref(false)
const availableInputs = reactive<WebMidi.MIDIInput[]>([])
const availableOutputs = reactive<WebMidi.MIDIOutput[]>([])
const availablePorts = {
    inputs: availableInputs,
    outputs: availableOutputs,
} as const

const portsInUse: {
    input: WebMidi.MIDIInput | null
    output: WebMidi.MIDIOutput | null
} = {
    input: null,
    output: null,
}

export const JV1080 = readonly({
    MIDI_SUPPORTED,
    enabled,
    connected,
    availablePorts,
    portsInUse,
    enableMidi,
    setPorts,
    playTest,
})

async function enableMidi(): Promise<void> {
    if (enabled.value || !MIDI_SUPPORTED) {
        return
    }

    return new Promise((resolve, reject) => {
        function onMIDISuccess(midiAccess: WebMidi.MIDIAccess) {
            enabled.value = true
            addDevices(midiAccess.inputs, availableInputs)
            addDevices(midiAccess.outputs, availableOutputs)
            if (availableInputs.length === 1 && availableOutputs.length === 1) {
                setPorts({input: availableInputs[0], output: availableOutputs[0]})
            }
            midiAccess.addEventListener('statechange', onStateChange)
            resolve()
        }

        function onMIDIFailure() {
            const msg = 'Could not access your MIDI devices.'
            console.error(msg)
            reject(new Error(msg))
        }
        navigator.requestMIDIAccess({sysex: true}).then(onMIDISuccess, onMIDIFailure)
    })
}

function addDevices<
    Source extends WebMidi.MIDIInputMap | WebMidi.MIDIOutputMap,
    Target extends Source extends WebMidi.MIDIInputMap ? WebMidi.MIDIInput : WebMidi.MIDIOutput
>(source: Source, target: Target[]): void {
    target.splice(0)

    for (const device of source.values()) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target.push(device)
    }
}

function onStateChange({port}: Pick<WebMidi.MIDIConnectionEvent, 'port'>): void {
    const {state, type} = port

    const target = type === 'input' ? availableInputs : availableOutputs

    if (state === 'connected') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target.push(port)
    }
    else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const index = target.indexOf(port)
        target.splice(index, 1)
    }
}

function setPorts(ports: NonNullableObject<typeof portsInUse>): void {
    Object.assign(portsInUse, ports)
    connected.value = true
}

async function playTest(output?: WebMidi.MIDIOutput): Promise<void> {
    if (!(output || portsInUse.output)) {
        return
    }
    output = (output || portsInUse.output) as WebMidi.MIDIOutput
    await playNote(output, 60)
    await playNote(output, 62)
    await playNote(output, 64)
}

async function playNote(
    port: WebMidi.MIDIOutput,
    pitch: number,
    velocity = 127,
    duration = 500,
): Promise<void> {
    port.send([MIDI_STATUS_BYTE.NOTE_ON, pitch, velocity], 0)
    await sleep(duration)
    port.send([MIDI_STATUS_BYTE.NOTE_OFF, pitch, velocity], 0)
}

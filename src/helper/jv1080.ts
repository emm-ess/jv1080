import {sleep} from '@/helper/misc'
import {ref, reactive, readonly} from 'vue'
import WebMidi from 'webmidi'

const MIDI_SUPPORTED = !!navigator.requestMIDIAccess
const enabled = ref(false)
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
    availablePorts,
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
            addDevices(midiAccess, 'inputs')
            addDevices(midiAccess, 'outputs')
            midiAccess.addEventListener('statechange', onStateChange)
        }

        function onMIDIFailure() {
            const msg = 'Could not access your MIDI devices.'
            console.error(msg)
            reject(new Error(msg))
        }
        navigator.requestMIDIAccess({sysex: true}).then(onMIDISuccess, onMIDIFailure)
    })
}

function addDevices(midiAccess: WebMidi.MIDIAccess, type: 'inputs' | 'outputs'): void {
    const target = availablePorts[type]
    target.splice(0)

    for (const device of midiAccess[type].values()) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target.push(device)
    }
}

function onStateChange({port}: Pick<WebMidi.MIDIConnectionEvent, 'port'>): void {
    const {state, type} = port

    const target = type === 'input'
        ? availableInputs
        : availableOutputs

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
}

/**
 * returns true if connection opening was needed.
 * @param port
 */
async function connectIfNeeded(port: WebMidi.MIDIPort): Promise<boolean> {
    if (port.connection !== 'open') {
        await port.open()
        return true
    }
    return false
}

async function playTest(output?: WebMidi.MIDIOutput): Promise<void> {
    if (!(output || portsInUse.output)) {
        return
    }
    output = (output || portsInUse.output) as WebMidi.MIDIOutput
    await connectIfNeeded(output)
    await playNote(output, 60)
    await playNote(output, 62)
    await playNote(output, 64)
}

async function playNote(port: WebMidi.MIDIOutput, pitch: number, velocity = 127, duration = 500): Promise<void> {
    port.send([WebMidi.MIDI_CHANNEL_MESSAGES.noteon << 4, pitch, velocity], 0)
    await sleep(duration)
    port.send([WebMidi.MIDI_CHANNEL_MESSAGES.noteoff << 4, pitch, velocity], 0)
}

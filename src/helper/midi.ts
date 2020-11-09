export function hasMidiSupport(): boolean {
    return !!navigator.requestMIDIAccess
}

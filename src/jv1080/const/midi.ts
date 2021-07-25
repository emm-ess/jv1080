/**
 * MIDI message includes a status byte and up to two data bytes.
 * Status byte
 * * The most significant bit of status byte is set to 1.
 * * The 4 low-order bits identify which channel it belongs to (four bits produce 16 possible channels).
 * * The 3 remaining bits identify the message.
 * * The most significant bit of data byte is set to 0.
 */
export const MIDI_STATUS_BYTE = {
    // Channel messages
    NOTE_OFF: 0x80,
    NOTE_ON: 0x90,
    KEY_AFTERTOUCH: 0xA0,
    CONTROL_CHANGE: 0xB0,
    PROGRAM_CHANGE: 0xC0,
    CHANNEL_AFTERTOUCH: 0xD0,
    PITCH_BEND: 0xE0,
    // System common messages
    MIDI_TIMING_CODE: 0xF1,
    SONG_POSITION_POINTER: 0xF2,
    SONG_SELECT: 0xF3,
    TUNE_REQUEST: 0xF6,
    // System real-time messages
    TIMING_CLOCK: 0xF8,
    START_SEQUENCE: 0xFA,
    CONTINUE_SEQUENCE: 0xFB,
    STOP_SEQUENCE: 0xFC,
    ACTIVE_SENSING: 0xFE,
    SYSTEM_RESET: 0xFF,
    // System exclusive messages
    SYSEX: 0xF0,
    SYSEX_END: 0xF7,
} as const

export const CHANNEL_MODE_DATA_BYTES = {
    RESET_ALL_CONTROLLERS: 0x79,
    LOCAL_CONTROL: 0x7A,
    ALL_NOTES_OFF: 0x7B,
    OMNI_MODE_OFF: 0x7C,
    OMNI_MODE_ON: 0x7D,
    MONO_MODE_ON: 0x7E,
    POLY_MODE_ON: 0x7E,
} as const

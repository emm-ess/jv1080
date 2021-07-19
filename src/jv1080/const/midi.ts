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
    KEY_AFTERTOUCH: 0xa0,
    CONTROL_CHANGE: 0xb0,
    PROGRAM_CHANGE: 0xc0,
    CHANNEL_AFTERTOUCH: 0xd0,
    PITCH_BEND: 0xe0,
    // System common messages
    MIDI_TIMING_CODE: 0xf1,
    SONG_POSITION_POINTER: 0xf2,
    SONG_SELECT: 0xf3,
    TUNE_REQUEST: 0xf6,
    // System real-time messages
    TIMING_CLOCK: 0xf8,
    START_SEQUENCE: 0xfa,
    CONTINUE_SEQUENCE: 0xfb,
    STOP_SEQUENCE: 0xfc,
    ACTIVE_SENSING: 0xfe,
    SYSTEM_RESET: 0xff,
    // System exclusive messages
    SYSEX: 0xf0,
    SYSEX_END: 0xf7,
} as const

export const CHANNEL_MODE_DATA_BYTES = {
    RESET_ALL_CONTROLLERS: 0x79,
    LOCAL_CONTROL: 0x7a,
    ALL_NOTES_OFF: 0x7b,
    OMNI_MODE_OFF: 0x7c,
    OMNI_MODE_ON: 0x7d,
    MONO_MODE_ON: 0x7e,
    POLY_MODE_ON: 0x7e,
} as const

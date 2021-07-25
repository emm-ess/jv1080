/* eslint key-spacing: ["error", { "align": "value" }] */

import {createNumberArray} from '@/lib'

import {rehydrateDataAddresses} from './helper'
import type {
    DehydratedData,
    DehydratedDataAddressLeaf,
    DehydratedDataAddressNode,
    DehydratedRangeData,
    DehydratedValuesData,
} from './types'

// ------------------------------------------------------------
// Types
// ------------------------------------------------------------
const values = 'values'
const range = 'range'

// ------------------------------------------------------------
// COMMON VALUES
// ------------------------------------------------------------
const VALUES = {
    AFTERTOURCH_SOURCE:     ['CHANNEL_AFTER', 'POLY_AFTER', 'CHANNEL_AND_POLY'],
    BIAS_DIRECTION:         ['LOWER', 'UPPER', 'LOWER_AND_UPPER', 'ALL'],
    BOOLEAN:                ['OFF', 'ON'],
    BOOSTER_LEVEL:          [0, 6, 12, 18],
    CHORUS_OUTPUT_ASSIGN:   ['MIX', 'REVERB', 'MIX_AND_REV'],
    CLOCK_SOURCE:           ['INTERNAL', 'MIDI'],
    CONTROLLER_DESTINATION: [
        'OFF',
        'PCH',
        'CUT',
        'RES',
        'LEV',
        'PAN',
        'MIX',
        'CHO',
        'REV',
        'PL_1',
        'PL_2',
        'FL_1',
        'FL_2',
        'AL_1',
        'AL_2',
        'pL_1',
        'pL_2',
        'L_1_R',
        'L_2_R',
    ],
    CONTROL_CHANNEL: [...createNumberArray(1, 16), 'OFF'],
    CONTROL_SOURCE:  [
        'OFF',
        'SYS_CTRL_1',
        'SYS_CTRL_2',
        'MODULATION',
        'BREATH',
        'FOOT',
        'VOLUME',
        'PAN',
        'EXPRESSION',
        'BENDER',
        'AFTERTOUCH',
    ],
    EFX_OUTPUT_ASSIGN:    ['MIX', 'OUTPUT_1', 'OUTPUT_2'],
    EFX_SOURCE:           ['PERFORMANCE', ...createNumberArray(1, 16)],
    ENVELOPE_MODE:        ['NO_SUSTAIN', 'SUSTAIN'],
    FILTER_TYPE:          ['OFF', 'LPF', 'BPF', 'HPF', 'PKG'],
    HOLD:                 ['OFF', 'HOLD_1', 'SOSTENUTO', 'SOFT', 'HOLD_2'],
    HOLD_PEAK:            ['OFF', 'HOLD', 'PEAK'],
    KEYFOLLOW:            [-100, -70, -50, -30, -10, 0, 10, 20, 30, 40, 50, 70, 100, 120, 150, 200],
    KEY_ASSIGN_MODE:      ['POLY', 'SOLO'],
    LFO_EXTERNAL_SYNC:    ['OFF', 'CLOCK', 'TAP'],
    LFO_FADE_MODE:        ['ON_IN', 'ON_OUT', 'OFF_IN', 'OFF_OUT'],
    LFO_LEVEL_OFFSET:     [-100, -50, 0, 50, 100],
    LFO_WAVEFORM:         ['TRI', 'SIN', 'SAW', 'SQR', 'TRP', 'S_AND_H', 'RND', 'CHS'],
    MUTE_GROUP:           ['OFF', ...createNumberArray(1, 31)],
    OUTPUT:               ['MIX', 'EFX', 'OUTPUT_1', 'OUTPUT_2'],
    OUTPUT_ASSIGN:        ['MIX', 'EFX', 'OUTPUT_1', 'OUTPUT_2', 'PATCH'],
    PANEL_MODE:           ['PERFORMANCE', 'PATCH', 'GM'],
    PAN_CONTROL_SWITCH:   ['OFF', 'CONTINUOUS', 'KEY_ON'],
    PATCH_CONTROL_SOURCE: [
        'OFF',
        'SYS_CTRL_1',
        'SYS_CTRL_2',
        'MODULATION',
        'BREATH',
        'FOOT',
        'VOLUME',
        'PAN',
        'EXPRESSION',
        'BENDER',
        'AFTERTOUCH',
        'LFO_1',
        'LFO_2',
        'VELOCITY',
        'KEYFOLLOW',
        'PLAYMATE',
    ],
    PATCH_MODE_PATCH_GROUP: ['USER', 'PCM', 'EXP'],
    PATCH_RECEIVE_CHANNEL:  createNumberArray(1, 16),
    PORTAMENTO_MODE:        ['NORMAL', 'LEGATO'],
    PORTAMENTO_START:       ['PITCH', 'NOTE'],
    PORTAMENTO_TYPE:        ['RATE', 'TIME'],
    PREVIEW_SOUND_MODE:     ['SINGLE', 'CHORD'],
    RANDOM_PITCH_DEPTH:     [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100,
        200,
        30,
        400,
        500,
        600,
        700,
        800,
        900,
        1000,
        1100,
        1200,
    ],
    REVERB_HF_DAMP: [
        200,
        250,
        315,
        400,
        500,
        630,
        800,
        1000,
        1250,
        1600,
        2000,
        2500,
        3150,
        4000,
        5000,
        6300,
        8000,
        'BYPASS',
    ],
    REVERB_TYPE:        ['ROOM_1', 'ROOM_2', 'STAGE_1', 'STAGE_2', 'HALL_1', 'HALL_2', 'DELAY', 'PAN_DLY'],
    RHYTHM_EDIT_SOURCE: ['PANEL', 'PANEL_AND_MIDI'],
    SENSITIVITY:        [-100, -70, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 70, 100],
    STRETCH_TUNE_DEPTH: ['OFF', 1, 2, 3],
    TONE_DELAY:         [
        'NORMAL',
        'HOLD',
        'KEY_INTERVAL',
        'CLOCK_SYNC',
        'TAP_SYNC',
        'KEY_OFF_NORMAL',
        'KEY_OFF_DECAY',
    ],
    VOICE_PRIORITY:        ['LAST', 'LOUDEST'],
    VOLUME_CONTROL_SOURCE: ['VOLUME', 'VOL_AND_EXP'],
    WAVE_GAIN:             [-6, 0, 6, 12],
    WAVE_GROUP:            ['INT', 'PCM', 'EXP'],
} as const

// ------------------------------------------------------------
// HELP FUNCTIONS
// ------------------------------------------------------------
type DehydratedNameData = Record<string, DehydratedRangeData>
function generateNameSection(): DehydratedNameData {
    const valueRange = [32, 127] as const

    const result: DehydratedNameData = {}
    for (let index = 0; index < 12; index++) {
        result[`NAME_${index + 1}`] = [index, range, valueRange]
    }
    return result
}

function generateEfxSection(startOffset: number): DehydratedDataAddressLeaf {
    return {
        EFX_TYPE:              [startOffset, range, 39],
        EFX_PARAMETER_1:       [startOffset + 1, range, 127],
        EFX_PARAMETER_2:       [startOffset + 2, range, 127],
        EFX_PARAMETER_3:       [startOffset + 3, range, 127],
        EFX_PARAMETER_4:       [startOffset + 4, range, 127],
        EFX_PARAMETER_5:       [startOffset + 5, range, 127],
        EFX_PARAMETER_6:       [startOffset + 6, range, 127],
        EFX_PARAMETER_7:       [startOffset + 7, range, 127],
        EFX_PARAMETER_8:       [startOffset + 8, range, 127],
        EFX_PARAMETER_9:       [startOffset + 9, range, 127],
        EFX_PARAMETER_10:      [startOffset + 10, range, 127],
        EFX_PARAMETER_11:      [startOffset + 11, range, 127],
        EFX_PARAMETER_12:      [startOffset + 12, range, 127],
        EFX_OUTPUT_ASSIGN:     [startOffset + 13, values, VALUES.EFX_OUTPUT_ASSIGN],
        EFX_OUTPUT_LEVEL:      [startOffset + 14, range, 127],
        EFX_CHORUS_SEND_LEVEL: [startOffset + 15, range, 127],
        EFX_REVERB_SEND_LEVEL: [startOffset + 16, range, 127],
        EFX_CONTROL_SOURCE_1:  [startOffset + 17, values, VALUES.CONTROL_SOURCE],
        EFX_CONTROL_DEPTH_1:   [startOffset + 18, range, [-63, 63]],
        EFX_CONTROL_SOURCE_2:  [startOffset + 19, values, VALUES.CONTROL_SOURCE],
        EFX_CONTROL_DEPTH_2:   [startOffset + 20, range, [-63, 63]],
        CHORUS_LEVEL:          [startOffset + 21, range, 127],
        CHORUS_RATE:           [startOffset + 22, range, 127],
        CHORUS_DEPTH:          [startOffset + 23, range, 127],
        CHORUS_PRE_DELAY:      [startOffset + 24, range, 127],
        CHORUS_FEEDBACK:       [startOffset + 25, range, 127],
        CHORUS_OUTPUT_ASSIGN:  [startOffset + 26, values, VALUES.CHORUS_OUTPUT_ASSIGN],
        REVERB_TYPE:           [startOffset + 27, values, VALUES.REVERB_TYPE],
        REVERB_LEVEL:          [startOffset + 28, range, 127],
        REVERB_TIME:           [startOffset + 29, range, 127],
        REVERB_HF_DAMP:        [startOffset + 30, values, VALUES.REVERB_HF_DAMP],
        REVERB_FEEDBACK:       [startOffset + 31, range, 127],
    } as const
}

type LfoSectionData = Record<`LFO_${number}_${string}`, DehydratedData>
function generateLfoSection(lfo: number, startOffset: number): LfoSectionData {
    return {
        [`LFO_${lfo}_WAVEFORM`]:      [startOffset, values, VALUES.LFO_WAVEFORM],
        [`LFO_${lfo}_KEY_TRIGGER`]:   [startOffset + 1, values, VALUES.BOOLEAN],
        [`LFO_${lfo}_RATE`]:          [startOffset + 2, range, 127],
        [`LFO_${lfo}_LEVEL_OFFSET`]:  [startOffset + 3, values, VALUES.LFO_LEVEL_OFFSET],
        [`LFO_${lfo}_DELAY_TIME`]:    [startOffset + 4, range, 127],
        [`LFO_${lfo}_FADE_MODE`]:     [startOffset + 5, values, VALUES.LFO_FADE_MODE],
        [`LFO_${lfo}_FADE_TIME`]:     [startOffset + 6, range, 127],
        [`LFO_${lfo}_EXTERNAL_SYNC`]: [startOffset + 7, values, VALUES.LFO_EXTERNAL_SYNC],
    } as const
}

type EnevelopeSectionData = Record<`${'F' | 'A'}_ENV_${string}`, DehydratedData>
function generateEnvelopeSection(prefix: 'F' | 'A', startOffset: number): EnevelopeSectionData {
    return {
        [`${prefix}_ENV_VELOCITY_CURVE`]:              [startOffset, range, 6],
        // TODO:
        // . range is -50 - +200
        [`${prefix}_ENV_VELOCITY_SENSITIVITY`]:        [startOffset + 1, range, 125],
        [`${prefix}_ENV_VELOCITY_TIME_1_SENSITIVITY`]: [
            startOffset + 2,
            values,
            VALUES.SENSITIVITY,
        ],
        [`${prefix}_ENV_VELOCITY_TIME_4_SENSITIVITY`]: [
            startOffset + 3,
            values,
            VALUES.SENSITIVITY,
        ],
        [`${prefix}_ENV_TIME_KEYFOLLOW`]: [startOffset + 4, values, VALUES.SENSITIVITY],
        [`${prefix}_ENV_TIME_1`]:         [startOffset + 5, range, 127],
        [`${prefix}_ENV_TIME_2`]:         [startOffset + 6, range, 127],
        [`${prefix}_ENV_TIME_3`]:         [startOffset + 7, range, 127],
        [`${prefix}_ENV_TIME_4`]:         [startOffset + 8, range, 127],
        [`${prefix}_ENV_LEVEL_1`]:        [startOffset + 9, range, 127],
        [`${prefix}_ENV_LEVEL_2`]:        [startOffset + 10, range, 127],
        [`${prefix}_ENV_LEVEL_3`]:        [startOffset + 11, range, 127],
    } as const
}

// ------------------------------------------------------------
// PARAMETER LISTS
// ------------------------------------------------------------
type ControllerSectionData = {
    [key: string]: DehydratedValuesData | DehydratedRangeData
}
const CONTROLLER_SECTION = ((): ControllerSectionData => {
    const entries: ControllerSectionData = {}
    for (let index = 0; index < 3; index++) {
        const outerOffset = 0x15 + index * 8
        for (let index_ = 0; index_ < 4; index_++) {
            const offset = outerOffset + index_ * 2
            entries[`CONTROLLER_${index + 1}_DESTINATION_${index_ + 1}`] = [
                offset,
                values,
                VALUES.CONTROLLER_DESTINATION,
            ]
            entries[`CONTROLLER_${index + 1}_DEPTH_${index_ + 1}`] = [offset + 1, range, 126]
        }
    }
    return entries
})()

// ------------------------------------------------------------
// DATA ADDRESS SUB-PARTS
// ------------------------------------------------------------
// 1-1-1 System common
const SYSTEM_COMMON = {
    PANEL_MODE:                [0x00, values, VALUES.PANEL_MODE],
    /**
     * USER:01 - USER:32,
     * CARD:01 - CARD:32,
     * PR-A:01 - PR-A:32,
     * PR-B:01 - PR-B:32
     */
    PERFORMANCE_NUMBER:        [0x01, range, 127],
    PATCH_MODE_PATCH_GROUP:    [0x02, values, VALUES.PATCH_MODE_PATCH_GROUP],
    PATCH_MODE_PATCH_GROUP_ID: [0x03, range, 127],
    PATCH_MODE_PATCH_NUMBER:   [0x04, range, 254],
    /**
     * 427.4 - 452.6 Hz
     */
    MASTER_TUNE:               [0x06, range, 126],
    SCALE_TUNE_SWITCH:         [0x07, values, VALUES.BOOLEAN],
    EFX_SWITCH:                [0x08, values, VALUES.BOOLEAN],
    CHORUS_SWITCH:             [0x09, values, VALUES.BOOLEAN],
    REVERB_SWITCH:             [0x0A, values, VALUES.BOOLEAN],
    PATCH_REMAIN:              [0x0B, values, VALUES.BOOLEAN],
    CLOCK_SOURCE:              [0x0C, values, VALUES.CLOCK_SOURCE],
    TAP_CONTROL_SOURCE:        [0x0D, values, VALUES.HOLD],
    HOLD_CONTROL_SOURCE:       [0x0E, values, VALUES.HOLD],
    PEAK_CONTROL_SOURCE:       [0x0F, values, VALUES.HOLD],
    VOLUME_CONTROL_SOURCE:     [0x10, values, VALUES.VOLUME_CONTROL_SOURCE],
    AFTERTOUCH_SOURCE:         [0x11, values, VALUES.AFTERTOURCH_SOURCE],
    /**
     * CC0O - CC95,
     * BEND£R,
     * AFTERTOUCH
     */
    SYSTEM_CONTROL_SOURCE_1:   [0x12, range, 97],
    /**
     * CC0O - CC95,
     * BEND£R,
     * AFTERTOUCH
     */
    SYSTEM_CONTROL_SOURCE_2:   [0x13, range, 97],
    RECEIVE_PROGRAM_CHANGE:    [0x14, values, VALUES.BOOLEAN],
    RECEIVE_BANK_SELECT:       [0x15, values, VALUES.BOOLEAN],
    RECEIVE_CONTROL_CHANGE:    [0x16, values, VALUES.BOOLEAN],
    RECEIVE_MODULATION:        [0x17, values, VALUES.BOOLEAN],
    RECEIVE_VOLUME:            [0x18, values, VALUES.BOOLEAN],
    RECEIVE_HOLD_1:            [0x19, values, VALUES.BOOLEAN],
    RECEIVE_BENDER:            [0x1A, values, VALUES.BOOLEAN],
    RECEIVE_AFTERTOUCH:        [0x1B, values, VALUES.BOOLEAN],
    CONTROL_CHANNEL:           [0x1C, values, VALUES.CONTROL_CHANNEL],
    PATCH_RECEIVE_CHANNEL:     [0x1D, values, VALUES.PATCH_RECEIVE_CHANNEL],
    RHYTHM_EDIT_SOURCE:        [0x1E, values, VALUES.RHYTHM_EDIT_SOURCE],
    PREVIEW_SOUND_MODE:        [0x1F, values, VALUES.PREVIEW_SOUND_MODE],
    /** C1 - G9 */
    PREVIEW_KEY_1:             [0x20, range, 127],
    /** OFF, 1 - 127 */
    PREVIEW_VELOCITY_1:        [0x21, range, 127],
    /** C1 - G9 */
    PREVIEW_KEY_2:             [0x22, range, 127],
    /** OFF, 1 - 127 */
    PREVIEW_VELOCITY_2:        [0x23, range, 127],
    /** C1 - G9 */
    PREVIEW_KEY_3:             [0x24, range, 127],
    /** OFF, 1 - 127 */
    PREVIEW_VELOCITY_3:        [0x25, range, 127],
    /** C1 - G9 */
    PREVIEW_KEY_4:             [0x26, range, 127],
    /** OFF, 1 - 127 */
    PREVIEW_VELOCITY_4:        [0x27, range, 127],
} as const

// 1-1-2 Scale tune
const SCALE_TUNE = {
    C:       [0x00, range, [-64, 63]],
    C_SHARP: [0x01, range, [-64, 63]],
    D:       [0x02, range, [-64, 63]],
    D_SHARP: [0x03, range, [-64, 63]],
    E:       [0x04, range, [-64, 63]],
    F:       [0x05, range, [-64, 63]],
    F_SHARP: [0x06, range, [-64, 63]],
    G:       [0x07, range, [-64, 63]],
    G_SHARP: [0x08, range, [-64, 63]],
    A:       [0x09, range, [-64, 63]],
    A_SHARP: [0x0A, range, [-64, 63]],
    B:       [0x0B, range, [-64, 63]],
} as const

// 1-2-1 Performance common
const PERFORMANCE_COMMON = {
    ...generateNameSection(),
    //
    EFX_SOURCE:            [0x0C, values, VALUES.EFX_SOURCE],
    ...generateEfxSection(0x0D),
    //
    DEFAULT_TEMPO:         [0x2D, range, [20, 250]],
    KEY_RANGE_SWITCH:      [0x2F, values, VALUES.BOOLEAN],
    //
    PART_1_VOICE_RESERVE:  [0x30, range, 64],
    PART_2_VOICE_RESERVE:  [0x31, range, 64],
    PART_3_VOICE_RESERVE:  [0x32, range, 64],
    PART_4_VOICE_RESERVE:  [0x33, range, 64],
    PART_5_VOICE_RESERVE:  [0x34, range, 64],
    PART_6_VOICE_RESERVE:  [0x35, range, 64],
    PART_7_VOICE_RESERVE:  [0x36, range, 64],
    PART_8_VOICE_RESERVE:  [0x37, range, 64],
    PART_9_VOICE_RESERVE:  [0x38, range, 64],
    PART_10_VOICE_RESERVE: [0x39, range, 64],
    PART_11_VOICE_RESERVE: [0x3A, range, 64],
    PART_12_VOICE_RESERVE: [0x3B, range, 64],
    PART_13_VOICE_RESERVE: [0x3C, range, 64],
    PART_14_VOICE_RESERVE: [0x3D, range, 64],
    PART_15_VOICE_RESERVE: [0x3E, range, 64],
    PART_16_VOICE_RESERVE: [0x3F, range, 64],
} as const

// 1-2-2 Performance part
const PERFORMANCE_PART = {
    MIDI_RECEIVE_SWITCH:    [0x00, values, VALUES.BOOLEAN],
    MIDI_CHANNEL:           [0x01, range, 15],
    PATCH_GROUP:            [0x02, values, VALUES.PATCH_MODE_PATCH_GROUP],
    PATCH_GROUP_ID:         [0x03, range, 127],
    PATCH_NUMBER:           [0x04, range, 254],
    PART_LEVEL:             [0x06, range, 127],
    PART_PAN:               [0x07, range, 127],
    PITCH_COARSE_TUNE:      [0x08, range, 96],
    PITCH_FINE_TUNE:        [0x09, range, 100],
    OUTPUT_ASSIGN:          [0x0A, values, VALUES.OUTPUT_ASSIGN],
    OUTPUT_LEVEL:           [0x0B, range, 127],
    CHORUS_SEND_LEVEL:      [0x0C, range, 127],
    REVERB_SEND_LEVEL:      [0x0D, range, 127],
    RECEIVE_PROGRAM_CHANGE: [0x0E, values, VALUES.BOOLEAN],
    RECEIVE_VOLUME:         [0x0F, values, VALUES.BOOLEAN],
    RECEIVE_HOLD_1:         [0x10, values, VALUES.BOOLEAN],
    KEY_RANGE_LOWER:        [0x11, range, 127],
    KEY_RANGE_UPPER:        [0x12, range, 127],
} as const

// 1-3-1 Patch common
const PATCH_COMMON = {
    ...generateNameSection(),
    //
    ...generateEfxSection(0x0C),
    //
    DEFAULT_TEMPO:          [0x2C, range, [20, 250]],
    PATCH_LEVEL:            [0x2E, range, 127],
    PATCH_PAN:              [0x2F, range, 127],
    ANALOG_FEEL_DEPTH:      [0x30, range, 127],
    BENDER_RANGE_UP:        [0x31, range, 12],
    BENDER_RANGE_DOWN:      [0x32, range, 48],
    KEY_ASSIGN_MODE:        [0x33, values, VALUES.KEY_ASSIGN_MODE],
    SOLO_LEGATO:            [0x34, values, VALUES.BOOLEAN],
    PORTAMENTO_SWITCH:      [0x35, values, VALUES.BOOLEAN],
    PORTAMENTO_MODE:        [0x36, values, VALUES.PORTAMENTO_MODE],
    PORTAMENTO_TYPE:        [0x37, values, VALUES.PORTAMENTO_TYPE],
    PORTAMENTO_START:       [0x38, values, VALUES.PORTAMENTO_START],
    PORTAMENTO_TIME:        [0x39, range, 127],
    PATCH_CONTROL_SOURCE_2: [0x3A, values, VALUES.PATCH_CONTROL_SOURCE],
    PATCH_CONTROL_SOURCE_3: [0x3B, values, VALUES.PATCH_CONTROL_SOURCE],
    EFX_CONTROL_HOLD_PEAK:  [0x3C, values, VALUES.HOLD_PEAK],
    CONTROL_1_HOLD_PEAK:    [0x3D, values, VALUES.HOLD_PEAK],
    CONTROL_2_HOLD_PEAK:    [0x3E, values, VALUES.HOLD_PEAK],
    CONTROL_3_HOLD_PEAK:    [0x3F, values, VALUES.HOLD_PEAK],
    VELOCITY_RANGE_SWITCH:  [0x40, values, VALUES.BOOLEAN],
    OCTAVE_SWITCH:          [0x41, range, 6],
    STRETCH_TUNE_DEPTH:     [0x42, values, VALUES.STRETCH_TUNE_DEPTH],
    VOICE_PRIORITY:         [0x43, values, VALUES.VOICE_PRIORITY],
    STRUCTURE_TYPE_1_2:     [0x44, range, 9],
    BOOSTER_LEVEL_1_2:      [0x45, values, VALUES.BOOSTER_LEVEL],
    STRUCTURE_TYPE_3_4:     [0x46, range, 9],
    BOOSTER_LEVEL_3_4:      [0x47, values, VALUES.BOOSTER_LEVEL],
} as const

// 1-3-2 Patch tone
const PATCH_TONE = {
    TONE_SWITCH:                       [0x00, values, VALUES.BOOLEAN],
    WAVE_GROUP:                        [0x01, values, VALUES.WAVE_GROUP],
    WAVE_GROUP_ID:                     [0x02, range, 127],
    WAVE_NUMBER:                       [0x03, range, 254],
    WAVE_GAIN:                         [0x05, values, VALUES.WAVE_GAIN],
    FXM_SWITCH:                        [0x06, values, VALUES.BOOLEAN],
    FXM_COLOR:                         [0x07, range, 3],
    FXM_DEPTH:                         [0x08, range, 15],
    TONE_DELAY_MODE:                   [0x09, values, VALUES.TONE_DELAY],
    TONE_DELAY_TIME:                   [0x0A, range, 127],
    //
    VELOCITY_CROSS_FADE_DEPTH:         [0x0B, range, 127],
    VELOCITY_RANGE_LOWER:              [0x0C, range, [1, 127]],
    VELOCITY_RANGE_UPPER:              [0x0D, range, [1, 127]],
    KEY_RANGE_LOWER:                   [0x0E, range, 127],
    KEY_RANGE_UPPER:                   [0x0F, range, 127],
    REDAMPER_CONTROL_SWITCH:           [0x10, values, VALUES.BOOLEAN],
    VOLUME_CONTROL_SWITCH:             [0x11, values, VALUES.BOOLEAN],
    HOLD_1_CONTROL_SWITCH:             [0x12, values, VALUES.BOOLEAN],
    BENDER_CONTROL_SWITCH:             [0x13, values, VALUES.BOOLEAN],
    PAN_CONTROL_SWITCH:                [0x14, values, VALUES.BOOLEAN],
    ...CONTROLLER_SECTION,
    //
    ...generateLfoSection(1, 0x2D),
    ...generateLfoSection(2, 0x35),
    //
    COARSE_TUNE:                       [0x3D, range, [-48, 48]],
    FINE_TUNE:                         [0x3E, range, [-50, 50]],
    RANDOM_PITH_DEPTH:                 [0x3F, values, VALUES.RANDOM_PITCH_DEPTH],
    PITCH_KEYFOLLOW:                   [0x40, values, VALUES.KEYFOLLOW],
    P_ENV_DEPTH:                       [0x41, range, [-12, 12]],
    // TODO:
    // . range is -50 - +200
    P_ENV_VELOCITY_SENSITIVITY:        [0x42, range, 125],
    P_ENV_VELOCITY_TIME_1_SENSITIVITY: [0x43, values, VALUES.SENSITIVITY],
    P_ENV_VELOCITY_TIME_4_SENSITIVITY: [0x44, values, VALUES.SENSITIVITY],
    P_ENV_VELOCITY_TIME_KEYFOLLOW:     [0x45, values, VALUES.SENSITIVITY],
    P_ENV_TIME_1:                      [0x46, range, 127],
    P_ENV_TIME_2:                      [0x47, range, 127],
    P_ENV_TIME_3:                      [0x48, range, 127],
    P_ENV_TIME_4:                      [0x49, range, 127],
    P_ENV_LEVEL_1:                     [0x4A, range, [-63, 63]],
    P_ENV_LEVEL_2:                     [0x4B, range, [-63, 63]],
    P_ENV_LEVEL_3:                     [0x4C, range, [-63, 63]],
    P_ENV_LEVEL_4:                     [0x4D, range, [-63, 63]],
    PITCH_LFO_1_DEPTH:                 [0x4E, range, [-63, 63]],
    PITCH_LFO_2_DEPTH:                 [0x4F, range, [-63, 63]],
    //
    FILTER_TYPE:                       [0x50, values, VALUES.FILTER_TYPE],
    CUTOFF_FREQUENCY:                  [0x51, range, 127],
    CUTOFF_KEYFOLLOW:                  [0x52, values, VALUES.KEYFOLLOW],
    RESONANCE:                         [0x53, range, 127],
    // TODO:
    // . range is -50 - +200
    RESONANCE_VELOCITY_SENSITIVITY:    [0x54, range, 127],
    F_ENV_DEPTH:                       [0x55, range, [-63, 63]],
    ...generateEnvelopeSection('F', 0x56),
    F_ENV_LEVEL_4:                     [0x62, range, 127],
    FILTER_LFO_1_DEPTH:                [0x63, range, [-63, 63]],
    FILTER_LFO_2_DEPTH:                [0x64, range, [-63, 63]],
    //
    TONE_LEVEL:                        [0x65, range, 127],
    BIAS_DIRECTION:                    [0x66, values, VALUES.BIAS_DIRECTION],
    BIAS_POINT:                        [0x67, range, 127],
    BIAS_LEVEL:                        [0x68, values, VALUES.SENSITIVITY],
    ...generateEnvelopeSection('A', 0x69),
    AMPLITUDE_LFO_1_DEPTH:             [0x75, range, [-63, 63]],
    AMPLITUDE_LFO_2_DEPTH:             [0x76, range, [-63, 63]],
    TONE_PAN:                          [0x77, range, [-64, 63]],
    PAN_KEYFOLLOW:                     [0x78, values, VALUES.SENSITIVITY],
    RANDOM_PAN_DEPTH:                  [0x79, range, 63],
    ALTERNATIVE_PAN_DEPTH:             [0x7A, range, [1, 127]],
    PAN_LFO_1_DEPTH:                   [0x7B, range, [-63, 63]],
    PAN_LFO_2_DEPTH:                   [0x7C, range, [-63, 63]],
    //
    OUTPUT_ASSIGN:                     [0x7D, values, VALUES.OUTPUT],
    OUTPUT_LEVEL:                      [0x7E, range, 127],
    CHORUS_SEND_LEVEL:                 [0x7F, range, 127],
    REVERB_SEND_LEVEL:                 [0x1_00, range, 127],
} as const

// 1-4-1 Rhythm common
const RHYTHM_COMMON = generateNameSection()

// 1-4-2 Rhythm note
const RHYTHM_NOTE = {
    TONE_SWITCH:                     [0x00, values, VALUES.BOOLEAN],
    WAVE_GROUP:                      [0x01, values, VALUES.WAVE_GROUP],
    WAVE_GROUP_ID:                   [0x02, range, 127],
    WAVE_NUMBER:                     [0x03, range, 254],
    WAVE_GAIN:                       [0x05, values, VALUES.WAVE_GAIN],
    BENDER_RANGE:                    [0x06, range, 12],
    MUTE_GROUP:                      [0x07, values, VALUES.MUTE_GROUP],
    ENVELOPE_MODE:                   [0x08, values, VALUES.ENVELOPE_MODE],
    VOLUME_CONTROL_SWITCH:           [0x09, values, VALUES.BOOLEAN],
    HOLD_1_CONTROL_SWITCH:           [0x0A, values, VALUES.BOOLEAN],
    PAN_CONTROL_SWITCH:              [0x0B, values, VALUES.PAN_CONTROL_SWITCH],
    //
    SOURCE_KEY:                      [0x0C, range, 127],
    FINE_TUNE:                       [0x0D, range, [-50, 50]],
    RANDOM_PITCH_DEPTH:              [0x0E, values, VALUES.RANDOM_PITCH_DEPTH],
    P_ENV_DEPTH:                     [0x0F, range, [-12, 12]],
    /** -50 - 200 */
    P_ENV_VELOCITY_SENSITIVITY:      [0x10, range, 125],
    P_ENV_VELOCITY_TIME_SENSITIVITY: [0x11, values, VALUES.SENSITIVITY],
    P_ENV_TIME_1:                    [0x12, range, 127],
    P_ENV_TIME_2:                    [0x13, range, 127],
    P_ENV_TIME_3:                    [0x14, range, 127],
    P_ENV_TIME_4:                    [0x15, range, 127],
    P_ENV_LEVEL_1:                   [0x16, range, [-63, 63]],
    P_ENV_LEVEL_2:                   [0x17, range, [-63, 63]],
    P_ENV_LEVEL_3:                   [0x18, range, [-63, 63]],
    P_ENV_LEVEL_4:                   [0x19, range, [-63, 63]],
    //
    FILTER_TYPE:                     [0x1A, values, VALUES.FILTER_TYPE],
    CUTOFF_FREQUENCY:                [0x1B, range, 127],
    RESONANCE:                       [0x1C, range, 127],
    /** -50 - 200 */
    RESONANCE_VELOCITY_VALUES:       [0x1D, range, 125],
    F_ENV_DEPTH:                     [0x1E, range, [-63, 63]],
    /** -50 - 200 */
    F_ENV_VELOCITY_SENSITIVITY:      [0x1F, range, 125],
    F_ENV_VELOCITY_TIME_SENSITIVITY: [0x20, values, VALUES.SENSITIVITY],
    F_ENV_TIME_1:                    [0x21, range, 127],
    F_ENV_TIME_2:                    [0x22, range, 127],
    F_ENV_TIME_3:                    [0x23, range, 127],
    F_ENV_TIME_4:                    [0x24, range, 127],
    F_ENV_LEVEL_1:                   [0x25, range, 127],
    F_ENV_LEVEL_2:                   [0x26, range, 127],
    F_ENV_LEVEL_3:                   [0x27, range, 127],
    F_ENV_LEVEL_4:                   [0x28, range, 127],
    //
    TONE_LEVEL:                      [0x29, range, 127],
    /** -50 - 200 */
    A_ENV_VELOCITY_SENSITIVITY:      [0x2A, range, 125],
    A_ENV_VELOCITY_TIME_SENSITIVITY: [0x2B, values, VALUES.SENSITIVITY],
    A_ENV_TIME_1:                    [0x2C, range, 127],
    A_ENV_TIME_2:                    [0x2D, range, 127],
    A_ENV_TIME_3:                    [0x2E, range, 127],
    A_ENV_TIME_4:                    [0x2F, range, 127],
    A_ENV_LEVEL_1:                   [0x30, range, 127],
    A_ENV_LEVEL_2:                   [0x31, range, 127],
    A_ENV_LEVEL_3:                   [0x32, range, 127],
    TONE_PAN:                        [0x33, range, [-64, 63]],
    RANDOM_PAN_DEPTH:                [0x34, range, 63],
    ALTERNATIVE_PAN_DEPTH:           [0x35, range, [1, 127]],
    //
    OUTPUT_ASSIGN:                   [0x36, values, VALUES.OUTPUT],
    OUTPUT_LEVEL:                    [0x37, range, 127],
    CHORUS_SEND_LEVEL:               [0x38, range, 127],
    REVERB_SEND_LEVEL:               [0x39, range, 127],
} as const

// ------------------------------------------------------------
// DATA ADDRESS PART-LISTS
// ------------------------------------------------------------
const RHYTHM_NOTES = (() => {
    const parts: {[key: string]: readonly [number, typeof RHYTHM_NOTE]} = {}

    for (let index = 0; index < 64; index++) {
        parts[`RHYTHM_NOTE_${index + 35}`] = [(0x23 + index) << 8, RHYTHM_NOTE]
    }

    return parts
})()

// ------------------------------------------------------------
// DATA ADDRESS PARTS
// ------------------------------------------------------------
const SCALE_TUNES = {
    PART_1:     [0x10 << 8, SCALE_TUNE],
    PART_2:     [0x11 << 8, SCALE_TUNE],
    PART_3:     [0x12 << 8, SCALE_TUNE],
    PART_4:     [0x13 << 8, SCALE_TUNE],
    PART_5:     [0x14 << 8, SCALE_TUNE],
    PART_6:     [0x15 << 8, SCALE_TUNE],
    PART_7:     [0x16 << 8, SCALE_TUNE],
    PART_8:     [0x17 << 8, SCALE_TUNE],
    PART_9:     [0x18 << 8, SCALE_TUNE],
    PART_10:    [0x19 << 8, SCALE_TUNE],
    PART_11:    [0x1A << 8, SCALE_TUNE],
    PART_12:    [0x1B << 8, SCALE_TUNE],
    PART_13:    [0x1C << 8, SCALE_TUNE],
    PART_14:    [0x1D << 8, SCALE_TUNE],
    PART_15:    [0x1E << 8, SCALE_TUNE],
    PART_16:    [0x1F << 8, SCALE_TUNE],
    PATCH_MODE: [0x20 << 8, SCALE_TUNE],
} as const

// 1-2 Performance
const PERFORMANCE = {
    COMMON:  [0x00 << 8, PERFORMANCE_COMMON],
    PART_1:  [0x10 << 8, PERFORMANCE_PART],
    PART_2:  [0x11 << 8, PERFORMANCE_PART],
    PART_3:  [0x12 << 8, PERFORMANCE_PART],
    PART_4:  [0x13 << 8, PERFORMANCE_PART],
    PART_5:  [0x14 << 8, PERFORMANCE_PART],
    PART_6:  [0x15 << 8, PERFORMANCE_PART],
    PART_7:  [0x16 << 8, PERFORMANCE_PART],
    PART_8:  [0x17 << 8, PERFORMANCE_PART],
    PART_9:  [0x18 << 8, PERFORMANCE_PART],
    PART_10: [0x19 << 8, PERFORMANCE_PART],
    PART_11: [0x1A << 8, PERFORMANCE_PART],
    PART_12: [0x1B << 8, PERFORMANCE_PART],
    PART_13: [0x1C << 8, PERFORMANCE_PART],
    PART_14: [0x1D << 8, PERFORMANCE_PART],
    PART_15: [0x1E << 8, PERFORMANCE_PART],
    PART_16: [0x1F << 8, PERFORMANCE_PART],
} as const

// 1-3 Patch
const PATCH = {
    COMMON:       [0x00 << 8, PATCH_COMMON],
    PATCH_TONE_1: [0x10 << 8, PATCH_TONE],
    PATCH_TONE_2: [0x12 << 8, PATCH_TONE],
    PATCH_TONE_3: [0x14 << 8, PATCH_TONE],
    PATCH_TONE_4: [0x16 << 8, PATCH_TONE],
} as const

// 1-4 Rhythm
const RHYTHM = {
    COMMON: [0x00 << 8, RHYTHM_COMMON],
    ...RHYTHM_NOTES,
} as const

const PERFORMANCE_MODE_TEMPORARY_PATCH = {
    PART_1:  [0x02_00 << 16, PATCH],
    PART_2:  [0x02_01 << 16, PATCH],
    PART_3:  [0x02_02 << 16, PATCH],
    PART_4:  [0x02_03 << 16, PATCH],
    PART_5:  [0x02_04 << 16, PATCH],
    PART_6:  [0x02_05 << 16, PATCH],
    PART_7:  [0x02_06 << 16, PATCH],
    PART_8:  [0x02_07 << 16, PATCH],
    PART_9:  [0x02_08 << 16, PATCH],
    PART_11: [0x02_0A << 16, PATCH],
    PART_12: [0x02_0B << 16, PATCH],
    PART_13: [0x02_0C << 16, PATCH],
    PART_14: [0x02_0D << 16, PATCH],
    PART_15: [0x02_0E << 16, PATCH],
    PART_16: [0x02_0F << 16, PATCH],
} as const

const USER_CARD_PART = {
    ...(() => {
        const addresses: {[key: string]: DehydratedDataAddressNode} = {}
        for (let index = 0; index < 32; index++) {
            addresses[`PERFORMANCE_${index + 1}`] = [index << 16, PERFORMANCE]
        }
        return addresses
    })(),
    RHYTHM_SETUP_1: [0x00_40 << 16, RHYTHM],
    RHYTHM_SETUP_2: [0x00_41 << 16, RHYTHM],
    ...(() => {
        const addresses: {[key: string]: DehydratedDataAddressNode} = {}
        for (let index = 0; index < 128; index++) {
            addresses[`PATCH_${index + 1}`] = [(0x01_00 + index) << 16, PATCH]
        }
        return addresses
    })(),
} as const

// ------------------------------------------------------------
// DATA ADDRESSES
// ------------------------------------------------------------
const JV1080_DATA_ADDRESSES_DEHYDRATED = {
    SYSTEM:                           [0x00_00 << 16, SYSTEM_COMMON],
    SCALE_TUNE:                       [0x00_00 << 16, SCALE_TUNES],
    //
    TEMPORARY_PERFORMANCE:            [0x01_00 << 16, PERFORMANCE],
    PERFORMANCE_MODE_TEMPORARY_PATCH: [0x00_00 << 16, PERFORMANCE_MODE_TEMPORARY_PATCH],
    TEMPORARY_RHYTHM_SETUP:           [0x02_09 << 16, RHYTHM],
    PATCH_MODE_TEMPORARY_PATCH:       [0x03_00 << 16, PATCH],
    //
    USER:                             [0x10_00 << 16, USER_CARD_PART],
    CARD:                             [0x20_00 << 16, USER_CARD_PART],
} as const

export const JV1080_DATA_ADDRESSES = rehydrateDataAddresses(JV1080_DATA_ADDRESSES_DEHYDRATED)

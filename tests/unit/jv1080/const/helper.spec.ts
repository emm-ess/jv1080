import {
    isDataAddressNode,
    rehydrateDataAddress,
    rehydrateDataAddresses,
} from '@/jv1080/const/helper'

const LEAF_0 = {
    FIELD_0: [0b00, 'values', ['A', 'B', 'C']],
    FIELD_1: [0b01, 'values', [0, 2, 4, 6, 8]],
    FIELD_2: [0b10, 'range', 200],
    FIELD_3: [0b11, 'range', [16, 32]],
} as const

const LEAF_1 = {
    FIELD_0: [0b00, 'values', ['ON', 'OFF']],
    FIELD_1: [0b01, 'range', 200],
} as const

const NODE_0 = {
    LEAF_0: [0b00 << 2, LEAF_0],
    LEAF_1: [0b01 << 2, LEAF_1],
    LEAF_2: [0b10 << 2, LEAF_1],
    LEAF_3: [0b11 << 2, LEAF_1],
} as const

const TEST_DATA = {
    NODE_0: [0b00 << 4, NODE_0],
    LEAF_0: [0b01 << 4, LEAF_0],
} as const

describe('isDataAddressNode', () => {
    it('checks whether the argument is a DataAddressNode or not', () => {
        expect(isDataAddressNode(NODE_0.LEAF_0)).toBeTruthy()
        expect(isDataAddressNode(LEAF_0.FIELD_1)).toBeFalsy()
    })
})

describe('rehydrateDataAddress', () => {
    const hydratedValues1 = rehydrateDataAddress(LEAF_0.FIELD_0, 0)
    const hydratedValues2 = rehydrateDataAddress(LEAF_0.FIELD_1, 1)
    const hydratesRange1 = rehydrateDataAddress(LEAF_0.FIELD_2, 0)
    const hydratesRange2 = rehydrateDataAddress(LEAF_0.FIELD_3, 1)

    it('uses the given address', () => {
        expect(hydratedValues1.address).toBe(0)
        expect(hydratedValues2.address).toBe(1)
        expect(hydratesRange1.address).toBe(0)
        expect(hydratesRange2.address).toBe(1)
    })

    it('passes the values back', () => {
        expect(hydratedValues1.values).toBe(LEAF_0.FIELD_0[2])
        expect(hydratedValues2.values).toBe(LEAF_0.FIELD_1[2])
        expect(hydratesRange1.values).toBeUndefined()
        expect(hydratesRange2.values).toBeUndefined()
    })

    it('creates a validator object', () => {
        expect(hydratedValues1.validator).toBeDefined()
        expect(hydratedValues2.range).toBeDefined()
        expect(hydratesRange1.validator).toBeDefined()
        expect(hydratesRange2.size).toBeDefined()
    })
})

describe('rehydrateDataAddresses', () => {
    const result = rehydrateDataAddresses(TEST_DATA)

    it('returns an object with the same structure', () => {
        expect(result.NODE_0).toBeDefined()
        expect(result.LEAF_0).toBeDefined()
        expect(result.NODE_0.LEAF_0).toBeDefined()
        expect(result.NODE_0.LEAF_0.FIELD_0).toBeDefined()
        expect(result.NODE_0.LEAF_0.FIELD_1).toBeDefined()
        expect(result.NODE_0.LEAF_0.FIELD_2).toBeDefined()
        expect(result.NODE_0.LEAF_0.FIELD_3).toBeDefined()
        expect(result.NODE_0.LEAF_1).toBeDefined()
        expect(result.NODE_0.LEAF_1.FIELD_0).toBeDefined()
        expect(result.NODE_0.LEAF_1.FIELD_1).toBeDefined()
        expect(result.NODE_0.LEAF_2.FIELD_0).toBeDefined()
        expect(result.LEAF_0.FIELD_3).toBeDefined()
    })

    it('doesn\'t reuse objects', () => {
        expect(result.NODE_0.LEAF_0.FIELD_2).not.toEqual(result.LEAF_0.FIELD_2)
    })

    it('calculates addresses', () => {
        expect(result.address).toBe(0)
        expect(result.NODE_0.address).toBe(0)
        expect(result.NODE_0.LEAF_0.FIELD_1.address).toBe(1)
        expect(result.NODE_0.LEAF_1.FIELD_0.address).toBe(4)
        expect(result.NODE_0.LEAF_1.FIELD_1.address).toBe(5)
        expect(result.NODE_0.LEAF_3.FIELD_1.address).toBe(13)
        expect(result.LEAF_0.FIELD_1.address).toBe(17)
    })

    it('calculates size', () => {
        expect(result.NODE_0.LEAF_0.size).toBe(5)
        expect(result.NODE_0.LEAF_1.size).toBe(3)
        expect(result.NODE_0.LEAF_2.size).toBe(3)
        expect(result.NODE_0.LEAF_3.size).toBe(3)
        expect(result.NODE_0.size).toBe(14)
        expect(result.LEAF_0.size).toBe(5)
        expect(result.size).toBe(19)
    })
})

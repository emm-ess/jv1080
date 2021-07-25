import {createNumberArray, nonUnique, unique} from '@/lib/array'

const TEST_ARRAY = ['a', 'b', 'a', 'c', 'B', 'a', 'b', 'e', 'd']

describe('unique', () => {
    it('doesn\'t change the provided array', () => {
        const copy = [...TEST_ARRAY]
        unique(copy)
        expect(copy.length).toBe(TEST_ARRAY.length)
    })

    it('removes duplicates', () => {
        const result = unique(TEST_ARRAY)
        expect(result.length).toBeLessThan(TEST_ARRAY.length)
    })
})

describe('nonUnique', () => {
    it('doesn\'t change the provided array', () => {
        const copy = [...TEST_ARRAY]
        nonUnique(copy)
        expect(copy.length).toBe(TEST_ARRAY.length)
    })

    it('returns only duplicates', () => {
        const result = nonUnique(TEST_ARRAY)
        expect(result.length).toBeLessThan(TEST_ARRAY.length)
        expect(result).toContain('a')
        expect(result).not.toContain('c')
    })
})

describe('createNumberArray', () => {
    it('creates an array containing the numbers between two given numbers', () => {
        const result = createNumberArray(3, 8)
        expect(result[0]).toBe(3)
        expect(result[1]).toBe(4)
        expect(result[2]).toBe(5)
        expect(result[3]).toBe(6)
        expect(result[4]).toBe(7)
        expect(result[5]).toBe(8)
    })

    it('creates the array also for negative to positive numbers', () => {
        const result = createNumberArray(-2, 2)
        expect(result[0]).toBe(-2)
        expect(result[1]).toBe(-1)
        expect(result[2]).toBe(0)
        expect(result[3]).toBe(1)
        expect(result[4]).toBe(2)
    })

    it('works for counting down', () => {
        const result = createNumberArray(1, -1)
        expect(result[0]).toBe(1)
        expect(result[1]).toBe(0)
        expect(result[2]).toBe(-1)
    })
})

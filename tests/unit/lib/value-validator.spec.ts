import {getValueValidator} from '@/lib/value-validator'

describe('Validator Number Range', () => {
    it('returns the correct object', () => {
        const value = Math.floor(Math.random() * 1000)
        const {range, size, validator} = getValueValidator(value)
        expect(validator).toBeInstanceOf(Function)
        expect(typeof size).toBe('number')
        expect(range).toBeInstanceOf(Array)
    })

    it('returns the valid range', () => {
        const value = Math.floor(Math.random() * 1000)
        const {range} = getValueValidator(value)
        expect(range[0]).toBe(0)
        expect(range[1]).toBe(value)
    })

    it('reuses generated functions', () => {
        const value = Math.floor(Math.random() * 1000)
        const validator1 = getValueValidator(value)
        const validator2 = getValueValidator(value)
        expect(validator1).toBe(validator2)
    })

    it('works with only one argument (going from zero to that argument)', () => {
        const value = Math.floor(Math.random() * 1000)
        const midValue = Math.floor(Math.random() * value)
        const {validator} = getValueValidator(value)
        expect(validator(-1)).toBe(false)
        expect(validator(0)).toBe(true)
        expect(validator(midValue)).toBe(true)
        expect(validator(value)).toBe(true)
        expect(validator(value + 1)).toBe(false)
    })

    it('takes also number arrays as argument', () => {
        const {validator} = getValueValidator([12, 35])
        expect(validator(11)).toBe(false)
        expect(validator(20)).toBe(true)
        expect(validator(46)).toBe(false)
    })

    it('doesn\'t rely on argument sorting', () => {
        const a = Math.floor(Math.random() * 1000)
        const b = Math.floor(Math.random() * 1000)
        const validator1 = getValueValidator([a, b])
        const validator2 = getValueValidator([b, a])
        expect(validator1).toBe(validator2)
    })

    it('returns the value range', () => {
        const {range} = getValueValidator([56, 34])
        expect(range[0]).toBe(34)
        expect(range[1]).toBe(56)
    })

    it('calculates the size of 7-bit segments needed', () => {
        const {size: size1} = getValueValidator(127)
        const {size: size2} = getValueValidator(200)
        const {size: size3} = getValueValidator(300)
        expect(size1).toBe(1)
        expect(size2).toBe(2)
        expect(size3).toBe(3)
    })
})

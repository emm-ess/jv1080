export type ValueValidator = {
    readonly validator: (value: number) => boolean
    readonly range: readonly [number, number]
    readonly size: number
}

type ValidatorKey = `${number}-${number}`
const validators = new Map<ValidatorKey, ValueValidator>()

export function getValueValidator(a: readonly [number, number] | number): ValueValidator {
    const [min, max] = Array.isArray(a) ? [Math.min(...a), Math.max(...a)] : [0, a as number]

    const key: ValidatorKey = `${min}-${max}`
    const validatorObject = validators.get(key) || {
        validator(value: number) {
            return min <= value && value <= max
        },
        range: [min, max],
        size: Math.ceil((max - min) / 127),
    }
    validators.set(key, validatorObject)
    return validatorObject
}

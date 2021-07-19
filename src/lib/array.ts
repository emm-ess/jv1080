type FilterFunc<T> = (value: T, index: number, self: T[]) => boolean

function onlyUniqueFunc<T>(value: T, index: number, self: T[]): boolean {
    return self.indexOf(value) === index
}

function nonUniqueFilterFunc<T>(value: T, index: number, self: T[]): boolean {
    return self.indexOf(value) !== index
}

export function unique<T>(arr: T[], filterFunc: FilterFunc<T> = onlyUniqueFunc): T[] {
    return arr.filter(filterFunc)
}

export function nonUnique<T>(arr: T[], filterFunc: FilterFunc<T> = nonUniqueFilterFunc): T[] {
    return arr.filter(filterFunc)
}

export function createNumberArray(start: number, end: number): number[] {
    const length = Math.abs(end - start) + 1
    const countFn =
        start < end
            ? (value: number, index: number) => start + index
            : (value: number, index: number) => start - index
    return new Array(length).fill(0).map(countFn)
}

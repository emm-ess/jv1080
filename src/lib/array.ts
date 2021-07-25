type FilterFunction<T> = (value: T, index: number, self: T[]) => boolean

function onlyUniqueFunction<T>(value: T, index: number, self: T[]): boolean {
    return self.indexOf(value) === index
}

function nonUniqueFilterFunction<T>(value: T, index: number, self: T[]): boolean {
    return self.indexOf(value) !== index
}

export function unique<T>(array: T[], filterFunction: FilterFunction<T> = onlyUniqueFunction): T[] {
    return array.filter(filterFunction)
}

export function nonUnique<T>(array: T[], filterFunction: FilterFunction<T> = nonUniqueFilterFunction): T[] {
    return array.filter(filterFunction)
}

export function createNumberArray(start: number, end: number): number[] {
    const length = Math.abs(end - start) + 1
    const countFunction
        = start < end
            ? (value: number, index: number) => start + index
            : (value: number, index: number) => start - index
    return new Array(length).fill(0).map(countFunction)
}

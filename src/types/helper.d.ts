declare type MaybeArray<T> = T | T[]

declare type ValuesOf<T> = T extends ImmutablePrimitive
    ? T
    : T extends Array<infer U>
    ? T[number]
    : T extends Record<infer K, infer U>
    ? T[K]
    : unknown

declare type ImmutablePrimitive =
    | undefined
    | null
    | boolean
    | string
    | number
    // eslint-disable-next-line @typescript-eslint/ban-types
    | Function

declare type Immutable<T> = T extends ImmutablePrimitive
    ? T
    : T extends Array<infer U>
    ? ImmutableArray<U>
    : T extends Map<infer K, infer V>
    ? ImmutableMap<K, V>
    : T extends Set<infer M>
    ? ImmutableSet<M>
    : ImmutableObject<T>

declare type ImmutableArray<T> = ReadonlyArray<Immutable<T>>
declare type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>
declare type ImmutableSet<T> = ReadonlySet<Immutable<T>>
declare type ImmutableObject<T> = {readonly [K in keyof T]: Immutable<T[K]>}

declare type Optional<Type extends Record<string, unknown>, Keys extends string> = Omit<
    Type,
    Keys
> &
    Partial<Pick<Type, Keys>>

// eslint-disable-next-line @typescript-eslint/ban-types
declare type EmptyObject = object

declare type NonNullableObject<T> = {[K in keyof T]: NonNullable<T[K]>}

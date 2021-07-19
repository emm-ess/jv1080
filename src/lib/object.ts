const {entries, fromEntries} = Object

type MapFunction<Obj extends Record<string | number | symbol, unknown>, Key extends keyof Obj> = (
    value: Obj[Key],
    key: Key,
    obj: Obj,
) => unknown

export function mapObject<
    Obj extends Record<string | number | symbol, unknown>,
    Key extends keyof Obj,
    CB extends MapFunction<Obj, Key>,
    Result extends {[key in Key]: ReturnType<CB>}
>(obj: Obj, cb: CB): Result {
    return fromEntries(
        entries(obj).map(([key, value]) => [key as Key, cb(value as Obj[Key], key as Key, obj)]),
    ) as Result
}

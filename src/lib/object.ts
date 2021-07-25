const {entries, fromEntries} = Object

type MapFunction<Object_ extends Record<string | number | symbol, unknown>, Key extends keyof Object_> = (
    value: Object_[Key],
    key: Key,
    object: Object_,
) => unknown

export function mapObject<
    Object_ extends Record<string | number | symbol, unknown>,
    Key extends keyof Object_,
    CB extends MapFunction<Object_, Key>,
    Result extends Record<Key, ReturnType<CB>>
>(object: Object_, callback: CB): Result {
    return fromEntries(
        // eslint-disable-next-line node/no-callback-literal
        entries(object).map(([key, value]) => [key as Key, callback(value as Object_[Key], key as Key, object)]),
    ) as Result
}

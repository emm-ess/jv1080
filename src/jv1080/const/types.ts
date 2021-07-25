import type {ValueValidator} from '@/lib'

/* eslint-disable no-use-before-define */

export type DehydratedValuesData = readonly [number, 'values', readonly (string | number)[]]
export type DehydratedRangeData = readonly [number, 'range', number | readonly [number, number]]
export type DehydratedData = DehydratedValuesData | DehydratedRangeData

export type DehydratedDataAddressNode = readonly [number, DehydratedDataAddresses]

export type DehydratedDataAddresses = {
    readonly [key: string]: DehydratedDataAddressNode | DehydratedData
}

export type DehydratedDataAddressLeaf = {
    readonly [key: string]: DehydratedValuesData | DehydratedRangeData
}

export type DataAddress = {
    readonly address: number
    readonly values?: readonly (string | number)[]
} & ValueValidator

export type DataAddresses<Dehydrated extends DehydratedDataAddresses> = {
    readonly address: number
    readonly size: number
} & {
    readonly [Key in keyof Dehydrated]: Dehydrated[Key] extends DehydratedDataAddressNode
        ? DataAddresses<Dehydrated[Key][1]>
        : DataAddress
}

/* eslint-enable no-use-before-define */

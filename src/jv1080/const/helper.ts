import {getValueValidator, mapObject} from '@/lib'
import type {
    DataAddress,
    DataAddresses,
    DehydratedData,
    DehydratedDataAddresses,
    DehydratedDataAddressNode,
} from './types'

// ------------------------------------------------------------
// REHYDRATE FUNCTIONS
// ------------------------------------------------------------
// TODO:
// . only rehydrate Data-Addresses once and use something like pointer to type & value

export function isDataAddressNode(
    value: DehydratedDataAddressNode | DehydratedData,
): value is DehydratedDataAddressNode {
    return value.length === 2
}

export function rehydrateDataAddress(
    dehydratedAddress: DehydratedData,
    address: number,
): DataAddress {
    return dehydratedAddress[1] === 'values'
        ? {
            address,
            values: dehydratedAddress[2],
            ...getValueValidator(dehydratedAddress[2].length - 1),
        }
        : {
            address,
            ...getValueValidator(dehydratedAddress[2]),
        }
}

export function rehydrateDataAddresses<Dehydrated extends DehydratedDataAddresses>(
    addresses: Dehydrated,
    address = 0,
): DataAddresses<Dehydrated> {
    let size = 0
    const result = mapObject(addresses, (value) => {
        const childAddress = address + value[0]
        const rehydratedChild = isDataAddressNode(value)
            ? rehydrateDataAddresses(value[1], childAddress)
            : rehydrateDataAddress(value, childAddress)
        size += rehydratedChild.size || 1
        return rehydratedChild
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {
        ...result,
        address,
        size,
    }
}

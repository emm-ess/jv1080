import {JV1080_DATA_ADDRESSES} from '@/jv1080/const/data-addresses'
import type {DataAddress, DataAddresses, DehydratedDataAddresses} from '@/jv1080/const/types'
import {nonUnique} from '@/lib'

type TestAddress = DataAddress & {path: string}
function getLeaves(object: DataAddresses<DehydratedDataAddresses>, parentPath = ''): TestAddress[] {
    const leaves: TestAddress[] = []
    for (const [key, value] of Object.entries(object)) {
        if (typeof value !== 'object') {
            continue
        }
        const path = parentPath
            ? `${parentPath}.${key}`
            : key
        if (value.range) {
            leaves.push({
                ...value,
                path,
            })
        }
        else {
            const subleaves = getLeaves(
                (value as unknown) as DataAddresses<DehydratedDataAddresses>,
                path,
            )
            leaves.push(...subleaves)
        }
    }
    return leaves
}

type Duplicates = Record<number, string[]>

describe('JV1080_DATA_ADDRESSES', () => {
    const LEAVES = getLeaves(
        (JV1080_DATA_ADDRESSES as unknown) as DataAddresses<DehydratedDataAddresses>,
    )

    it('consists of unique addresses', () => {
        const addressDuplicates = nonUnique(LEAVES.map(({address}) => address))
        if (addressDuplicates.length > 0) {
            const duplicatesPaths = LEAVES.filter(({address}) => {
                return addressDuplicates.includes(address)
            }).reduce((duplicates, {address, path}) => {
                if (!duplicates[address]) {
                    duplicates[address] = []
                }
                duplicates[address].push(path)
                return duplicates
            }, {} as Duplicates)
            console.log(duplicatesPaths)
        }
        expect(addressDuplicates.length).toBe(0)
    })
})

export * from './data-addresses'
export * from './midi'

export const ROLAND_MANUFACTURER_ID = 0x41
export const JV1080_MODEL_ID = 0x6A

export const ROLAND_EXCLUSIVE_COMMANDS = {
    /**
     * Request data 1 (RQ1)
     * This message is sent out when there is a need to acquire data from a device at
     * the other end of the interface. It contains data for the address and size that
     * specify designation and length, respectively, of data required.
     * On receiving an RQ1 message, the remote device checks its memory for the
     * data address and size that satisfy the request.
     * If it finds them and is ready for communication, the device will transmit J
     * "Data set 1 (DT1)" message, which contains the requested data. Otherwise.
     * the device won't send out anything.
     */
    REQUEST_DATA_1: 0x11,
}

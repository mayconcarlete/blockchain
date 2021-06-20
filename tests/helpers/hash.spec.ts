import { Hash } from "@src/helpers/hash"
import { Transaction } from "@src/types/transaction"
import cryptojs from 'crypto-js'

// jest.mock('crypto-js', () => ({
//     SHA256:() => {
//         throw new Error()
//     }
// }))


describe('Hash Class', () => {
    test('Should call SHA256 with correct params', () => {
        const hash = new Hash()
        const spyCrypto = jest.spyOn(cryptojs, 'SHA256')
        const timestamp = 1
        const lastHash = 'a'
        const data:Transaction = {
            from_id: 'a',
            target_id: 'b',
            value: 100
        }
        const response = hash.create(timestamp, lastHash, data)
        expect(spyCrypto).toHaveBeenCalledWith(`${timestamp}${lastHash}${data.from_id}${data.target_id}${data.value}`)
    })
})
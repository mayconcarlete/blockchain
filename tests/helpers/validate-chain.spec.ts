import { ValidateChain } from "@src/helpers/validate-chain"
import { Block } from "@src/types/block"
import { Transaction } from "@src/types/transaction"

describe('Validate Chain Class', () => {
    test('Should return false when chain[0] is not Genesis Block', () => {
        const timestamp = 0
        const lastHash = 'invalid_last_hash'
        const hash = 'invalid_hash'
        const data:Transaction = {
            from_id: 'valid_id',
            target_id: 'valid_id',
            value: 1
        }
        const chain:Block[] = [new Block(timestamp, lastHash, hash, data)]
        const validateChain = new ValidateChain()
        const isValidChain = validateChain.validate(chain)
        expect(isValidChain).toBe(false)
    })
})
import { Hash } from "@src/helpers/hash"
import { ValidateChain } from "@src/helpers/validate-chain"
import { MineBlock } from "@src/services/mine-block/mine-block"
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
    test('Should return false when block last hash is different from last block hash', () => {
        const chain:Block[] = [Block.genesis()]
        const hashCreator = new Hash()
        const mineBlock = new MineBlock(hashCreator)
        
        const data:Transaction = {
            from_id: 'valid_id',
            target_id: 'valid_id',
            value: 1
        }
        const data2:Transaction = {
            from_id: 'valid_id_2',
            target_id: 'valid_id_2',
            value: 2
        }
        
        const secondBlock = mineBlock.mine(chain[0], data)
        chain.push(secondBlock)
        const thirdBlock = mineBlock.mine(chain[0], data2)
        chain.push(thirdBlock)
        const validateChain = new ValidateChain()
        const isValidChain = validateChain.validate(chain)
        expect(isValidChain).toBe(false)
    })
})
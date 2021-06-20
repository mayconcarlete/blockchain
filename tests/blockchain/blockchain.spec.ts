import { BlockChain } from "@src/blockchain"
import { Block } from "@src/types/block"
import { Transaction } from "@src/types/transaction"

describe('Blockchain Class', () => {
    test('Should return right block when getLastBlock is called', () => {
        const genesisBlock = Block.genesis()
        const timestamp = 1000
        const lastHash = 'genesis hash'
        const hash = 'second hash'
        const data:Transaction = {
            from_id: 'valid_id',
            target_id: 'valid_id',
            value: 1
        }
        const secondBlock = new Block(timestamp, lastHash, hash, data)

        const blockChain = new BlockChain([genesisBlock, secondBlock])

        expect(blockChain.getLastBlock()).toEqual(secondBlock)
        
    })
})
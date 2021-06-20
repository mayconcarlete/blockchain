import { BlockChain } from "@src/blockchain"
import { Hash } from "@src/helpers/hash"
import { MineBlock } from "@src/services/mine-block/mine-block"
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
        const hashCreator = new Hash()
        const mineBlock = new MineBlock(hashCreator)
        const blockChain = new BlockChain([genesisBlock, secondBlock], mineBlock)

        expect(blockChain.getLastBlock()).toEqual(secondBlock)
    })
    test('Should add block to the last position in chain', () => {
        const genesisBlock = Block.genesis()
        const data:Transaction = {
            from_id: 'valid_id',
            target_id: 'valid_id',
            value: 1
        }
        const hashCreator = new Hash()
        const mineBlock = new MineBlock(hashCreator)
        const blockChain = new BlockChain([genesisBlock], mineBlock)
        blockChain.addBlock(data)
        const lastBlock = blockChain.getLastBlock()
        expect(lastBlock.getData).toEqual(data)
        expect(lastBlock.getLastHash).toBe(genesisBlock.getHash)
    })
})
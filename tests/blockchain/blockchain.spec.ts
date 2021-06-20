import { BlockChain } from "@src/blockchain"
import { Hash } from "@src/helpers/hash"
import { ValidateChain } from "@src/helpers/validate-chain"
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
        const validateChain = new ValidateChain(hashCreator)
        const blockChain = new BlockChain([genesisBlock, secondBlock], mineBlock, validateChain)

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
        const validateChain = new ValidateChain(hashCreator)
        const blockChain = new BlockChain([genesisBlock], mineBlock, validateChain)
        blockChain.addBlock(data)
        const lastBlock = blockChain.getLastBlock()
        expect(lastBlock.getData).toEqual(data)
        expect(lastBlock.getLastHash).toBe(genesisBlock.getHash)
    })
    test('Should validate a chain', () => {
        const chain:Block[] = [Block.genesis()]
        const hashCreator = new Hash()
        const mineBlock = new MineBlock(hashCreator)
        const validateChain = new ValidateChain(hashCreator)
        const firstBlockChain = new BlockChain(chain, mineBlock, validateChain)
        const data:Transaction = {
            from_id: 'valid_id',
            target_id: 'valid_id',
            value: 1000
        }
        const secondBlockChain = new BlockChain(chain, mineBlock, validateChain)
        secondBlockChain.addBlock(data)
        expect(firstBlockChain.isValidChain(secondBlockChain.getChain)).toBe(true)
    })
    test('Should invalidates a chain with a corrupted Genesis Block', () => {
        const chain:Block[] = [Block.genesis()] 
        const hashCreator = new Hash()
        const mineBlock = new MineBlock(hashCreator)
        const validateChain = new ValidateChain(hashCreator)
        const firstBlockChain = new BlockChain(chain, mineBlock, validateChain)
        const secondBlockChain = new BlockChain(chain, mineBlock, validateChain)
        jest.spyOn(secondBlockChain, 'getLastBlock').mockReturnValueOnce(new Block(100, 'invalid_last_hash', 'invalid_hash', {
            from_id:'dummy_value',
            target_id: 'dummy_value',
            value: 100
        }))
        const genesisValidate = firstBlockChain.isValidChain([secondBlockChain.getLastBlock()])
        expect(genesisValidate).toBe(false)
    })
    test('Should not replace chain by length', () => {
        const chain:Block[] = [Block.genesis()] 
        const hashCreator = new Hash()
        const mineBlock = new MineBlock(hashCreator)
        const validateChain = new ValidateChain(hashCreator)
        const firstBlockChain = new BlockChain(chain, mineBlock, validateChain)
        const secondBlockChain = new BlockChain(chain, mineBlock, validateChain)
        const data:Transaction = {
            from_id: 'valid_id',
            target_id: 'valid_id',
            value: 1000
        }
        firstBlockChain.addBlock(data)
        const replaceResult = firstBlockChain.replaceChain(secondBlockChain.getChain)
        expect(replaceResult).toEqual(new Error('Chain is not longer than the current chain'))
    })
})
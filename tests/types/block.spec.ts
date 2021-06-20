import {Block} from '@src/types/block'
import { Transaction } from '@src/types/transaction'

describe('Block Class', () => {
    test('Should return right values when block are created', () => {
        const timestamp = Date.now()
        const lastHash = 'last hash'
        const hash = 'new hash'
        const data:Transaction = {
            from_id: 'from_id',
            target_id: 'target_id',
            value: 0
        }
        
        const block = new Block(timestamp, lastHash, hash, data)
        expect(block.toString()).toEqual(`timestamp: ${timestamp} lastHash: ${lastHash} hash: ${hash} data: ${data}`)
    })
    test('Should return genesis block when genesis method are called', () => {
        const timestamp = 0
        const lastHash = ''
        const hash = 'first hash'
        const genesisTransaction:Transaction = {
            from_id: 'genesis_id',
            target_id: 'genesis_target',
            value: 0
        }
        expect(Block.genesis()).toEqual(new Block(timestamp, lastHash, hash, genesisTransaction))
    })
})
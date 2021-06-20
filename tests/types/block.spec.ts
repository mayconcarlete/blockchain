import {Block} from '@src/types/block'

describe('Block Class', () => {
    test('Should return right values when block are created', () => {
        const timestamp = Date.now()
        const lastHash = 'last hash'
        const hash = 'new hash'
        const date = Date.now()
        
        const block = new Block(timestamp, lastHash, hash, date)
        expect(block.toString()).toEqual(`timestamp: ${timestamp} lastHash: ${lastHash} hash: ${hash} date: ${date}`)
    })
    test('Should return genesis block when genesis method are called', () => {
        const timestamp = 0
        const lastHash = ''
        const hash = 'first hash'
        const date = 0
        
        expect(Block.genesis()).toEqual(new Block(timestamp, lastHash, hash, date))
    })
})
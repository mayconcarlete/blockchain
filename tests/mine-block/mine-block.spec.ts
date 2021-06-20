import { MakeHash } from '@src/interfaces/make-hash'
import {MineBlock} from '@src/services/mine-block/mine-block'
import { Block } from '@src/types/block'
import { Transaction } from '@src/types/transaction'

class MockHash implements MakeHash {
    create():string {
        return 'mock-new-hash'
    }
}

describe('MineBlock Class', () => {
    test('Should return mine new block', async () => {
        const timestamp = Date.now()
        const mockHash = new MockHash()
        const data:Transaction = {
            from_id: 'valid_id',
            target_id: 'valid_id',
            value: 1
        }
        const mineBlock = new MineBlock(timestamp, mockHash, Block.genesis(), data)
        expect(await mineBlock.mine()).toEqual(new Block(timestamp, 'first hash', 'mock-new-hash', data))
    })
})
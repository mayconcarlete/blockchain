import 'module-alias/register'
import { Hash } from './helpers/hash'
import {MineBlock} from './services/mine-block/mine-block'
import {Block} from './types/block'
import { Transaction } from './types/transaction'

const timestamp = Date.now()
const hash = new Hash()
const data:Transaction = {
    from_id:'genesis',
    target_id: 'Maycon',
    value: 100
}

const firstBlock = new MineBlock(timestamp, hash, Block.genesis(), data)

console.log(firstBlock.mine().toString())
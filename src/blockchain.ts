import {Block} from './types/block'
import {MineBlock} from './services/mine-block/mine-block'
import { AddBlock } from './interfaces/blockchain'
import { Transaction } from './types/transaction'

export class BlockChain implements AddBlock{
    constructor(
        private chain: Block[],
        private readonly mineBlock: MineBlock
    ){}
    addBlock(data: Transaction): Block {
        const lastBlock = this.getLastBlock()
        this.chain.push(this.mineBlock.mine(lastBlock, data))
        return this.getLastBlock()
    }
    
    getLastBlock():Block{
        return this.chain[this.chain.length - 1]
    }
}
import {Block} from './types/block'
import {MineBlock} from './services/mine-block/mine-block'
import { AddBlock } from './interfaces/blockchain'

export class BlockChain implements AddBlock{
    constructor(
        private chain:Block[],
    ){}
    addBlock(block: Block): Block {
        const lastBlock = this.getLastBlock()   
        return this.chain[0] 
    }
    getLastBlock():Block{
        return this.chain[this.chain.length - 1]
    }
}
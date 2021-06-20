import {Block} from './types/block'
import {MineBlock} from './services/mine-block/mine-block'
import { AddBlock } from './interfaces/blockchain'
import { Transaction } from './types/transaction'
import { ValidateChain } from './helpers/validate-chain'

export class BlockChain implements AddBlock{
    constructor(
        private chain: Block[],
        private readonly mineBlock: MineBlock,
        private readonly validateChain: ValidateChain
    ){}

    get getChain(){return this.chain}
    
    addBlock(data: Transaction): Block {
        const lastBlock = this.getLastBlock()
        this.chain.push(this.mineBlock.mine(lastBlock, data))
        return this.getLastBlock()
    }
    
    getLastBlock():Block{
        return this.chain[this.chain.length - 1]
    }

    isValidChain(chain: Block[]):boolean{
        return this.validateChain.validate(chain)
    }
}
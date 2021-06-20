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

    getChain(){return this.chain}
    
    addBlock(data: Transaction): Block {
        const lastBlock = this.getLastBlock()
        this.chain.push(this.mineBlock.mine(lastBlock, data))
        return this.getLastBlock()
    }
    
    getLastBlock():Block{
        return this.chain[this.chain.length - 1]
    }

    replaceChain(newChain: Block[]):Error | void{
        if(newChain.length <= this.chain.length){
            return new Error('Chain is not longer than the current chain') 
        }
        else if (!this.isValidChain(newChain)){
            return new Error('Invalid chain')
        }
        else{
            console.log('Replacing blockchain with the new chain')
            this.chain = newChain
        }
    }
    
    isValidChain(chain: Block[]):boolean{
        return this.validateChain.validate(chain)
    }
}
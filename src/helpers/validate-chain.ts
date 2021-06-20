import { IValidateChain } from "@src/interfaces/validate-chain";
import { Block } from "@src/types/block";
import { Hash } from "./hash";

export class ValidateChain implements IValidateChain {
    constructor(
        private readonly hashCreator: Hash
    ){}
    validate(chain: Block[]): boolean {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false
        }
        for(let i = 1; i < chain.length; i++){
            const lastBlock = chain[i -1]
            const actualBlock = chain[i]
            if(!this.isLastHash(lastBlock, actualBlock)){
                return false
            }
            if(!this.isHash(actualBlock)){
                return false
            }
            
        }
        return true
    }
    isLastHash(lastBlock: Block, actualBlock: Block):boolean{
        return lastBlock.getHash === actualBlock.getLastHash ? true : false 
    }
    isHash(actualBlock: Block):boolean{
        const calculateHash = this.hashCreator.blockHash(actualBlock)
        return calculateHash === actualBlock.getHash ? true : false
    }
}
import { IValidateChain } from "@src/interfaces/validate-chain";
import { Block } from "@src/types/block";

export class ValidateChain implements IValidateChain {
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
            
        }
        return true
    }
    isLastHash(lastBlock: Block, actualBlock: Block){
        return lastBlock.getHash === actualBlock.getLastHash ? true: false 
    }
}
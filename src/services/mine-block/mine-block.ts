import { MakeHash } from "@src/interfaces/make-hash";
import { Block } from "@src/types/block";
import { Transaction } from "@src/types/transaction";

export class MineBlock {
    constructor(
        private readonly hashCreator: MakeHash
    ){}
    mine(lastBlock: Block, data: Transaction):Block{
        const timestamp = Date.now()
        const hash = this.hashCreator.create(timestamp, lastBlock.getHash, data)
        return new Block(timestamp, lastBlock.getHash, hash, data)
    }
}
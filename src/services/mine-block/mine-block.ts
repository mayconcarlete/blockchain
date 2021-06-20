import { MakeHash } from "@src/interfaces/make-hash";
import { Block } from "@src/types/block";
import { Transaction } from "@src/types/transaction";

export class MineBlock {
    constructor(
        private readonly timestamp: number,
        private readonly hash: MakeHash,
        private readonly lastBlock: Block,
        private readonly data: Transaction
    ){}
    mine():Block{
        const hash = this.hash.create(this.timestamp, this.lastBlock.getHash, this.data)
        return new Block(this.timestamp, this.lastBlock.getHash, hash, this.data)
    }
}
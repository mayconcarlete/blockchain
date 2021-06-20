import { MakeHash } from "@src/interfaces/make-hash";
import { Block } from "@src/types/block";
import { Transaction } from "@src/types/transaction";

export class MineBlock {
    constructor(
        private readonly hash: MakeHash,
        private readonly lastBlock: Block,
        private readonly data: Transaction
    ){}
    mine():Block{
        const timestamp = Date.now()
        const hash = this.hash.create(timestamp, this.lastBlock.getHash, this.data)
        return new Block(timestamp, this.lastBlock.getHash, hash, this.data)
    }
}
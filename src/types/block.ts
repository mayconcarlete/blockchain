import { Transaction } from "./transaction"

export class Block {
    constructor(
        private readonly timestamp: number,
        private readonly lastHash: string,
        private readonly hash: string,
        private readonly data: Transaction,
    ){}
    toString():string {
        return `timestamp: ${this.timestamp} lastHash: ${this.lastHash} hash: ${this.hash} data: ${this.data}`
    }
    get getTimestamp (){return this.timestamp}
    get getHash(){return this.hash}
    get getLastHash(){return this.lastHash}
    get getData(){return this.data}
    
    static genesis():Block{
        const genesisTransaction:Transaction = {
            from_id: 'genesis_id',
            target_id: 'genesis_target',
            value: 0
        }
        return new this(0, '', 'first hash', genesisTransaction)
    }
}
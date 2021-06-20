import { MakeHash } from "@src/interfaces/make-hash";
import { Block } from "@src/types/block";
import { Transaction } from "@src/types/transaction";
import cryptojs from 'crypto-js'

export class Hash implements MakeHash{
    create(timestamp: number, lastHash: string, data: Transaction):string {
        return cryptojs.SHA256(`${timestamp}${lastHash}${data.from_id}${data.target_id}${data.value}`).toString()
    }
    blockHash(block: Block): string{
        const {getTimestamp, getLastHash, getData} = block
        return this.create(getTimestamp, getLastHash, getData)
    }
}  

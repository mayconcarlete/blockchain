import { Transaction } from "@src/types/transaction";

export interface MakeHash {
    create(timestamp: number, lastHash: string, data: Transaction):string
}
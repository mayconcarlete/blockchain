import { Block } from "@src/types/block";
import { Transaction } from "@src/types/transaction";

export interface AddBlock{
    addBlock(data: Transaction):Block
}
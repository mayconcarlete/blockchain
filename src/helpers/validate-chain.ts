import { IValidateChain } from "@src/interfaces/validate-chain";
import { Block } from "@src/types/block";

export class ValidateChain implements IValidateChain {
    validate(chain: Block[]): boolean {
        return false
    }
}
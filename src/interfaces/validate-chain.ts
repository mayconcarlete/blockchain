import { Block } from "@src/types/block";

export interface IValidateChain{
    validate(chain:Block[]):boolean
}
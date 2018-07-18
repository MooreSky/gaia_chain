
/**
 * Block Transaction
 */

// ============================== import

import { TransactionStruct } from "./struct/transaction_struct.s"

// ============================== export

export enum TransactionType {
    Default = 0,
    AddForge = 1,
    RemoveForge = 2,
}

export class Transaction extends TransactionStruct {
    
    constructor() {
        super();
    }
}
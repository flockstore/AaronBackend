import {TransactionDocument} from './transaction.entity';

export const transactionMock: TransactionDocument = {
    baseValue: 15,
    previousValue: 0,
    exchangeValue: 15,
    account: '',
    addition: true,
    related: {
        action: 'Test'
    },
    compound: []
} as TransactionDocument;

import {AccountCreate} from "./account-create.dto";

export const accountMock: AccountCreate = {
    name: 'Personal Account',
    number: 123456789,
    bank: 'Bancolombia',
    initialValue: 2000
} as AccountCreate;

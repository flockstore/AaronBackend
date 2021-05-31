import {ContactDocument} from './contact.entity';

export const contactMock: ContactDocument = {
    name: 'Johan',
    business: false,
    surname: 'Sebastian',
    address: {
        first: '50 Oakland Ave, #206',
        second: '',
        post: 32104,
        state: 'FL',
        city: 'Miami',
        country: 'US'
    },
    phone: 15048185976,
    documentType: 'CC',
    documentNumber: 1192345179
} as ContactDocument;

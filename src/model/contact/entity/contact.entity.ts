import {Document} from 'mongoose';
import {IsNotEmpty} from 'class-validator';
import {PartialModel} from '../../../common/model/partial-model';

export class ContactPartial extends PartialModel {}

export class Contact extends PartialModel {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    business: boolean;

    surname?: string;
    image?: string;
    address?: Address;
    phone?: number;
    documentType?: string;
    documentNumber?: number;
    organization?: string | Contact;

}

export class Address {
    first?: string;
    second?: string;
    post?: number;
    city?: string;
    state?: string;
    country?: string;
}

export type ContactDocument = Contact & Document;

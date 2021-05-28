import {Buffer} from 'buffer';

export interface AuthorizationCompound {
    hash: string;
    salt: Buffer;
}

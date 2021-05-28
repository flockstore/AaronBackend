import {Injectable} from '@nestjs/common';
import * as argon from 'argon2';
import {randomBytes} from 'crypto';
import {Buffer} from 'buffer';
import {from, Observable} from 'rxjs';
import {AuthorizationCompound} from '../interface/authorization-compound.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class PasswordSerializer {

    /**
     * Generates a serialized hash from a certain string.
     * @param password       to hash
     * @param salt           to use as hash
     */
    public serialize(password: string, salt?: Buffer): Observable<AuthorizationCompound> {
        const structuredSalt: Buffer = salt || randomBytes(32);
        return from(argon.hash(password, {salt: structuredSalt})).pipe(
            map(hash => ({
                hash,
                salt: structuredSalt
            }))
        );
    }

    /**
     * Validates a hashed password with a raw string.
     * @param password       to provide as hash
     * @param compare        to validate
     */
    public validate<T>(password: string, compare: string): Observable<boolean> {
        return from(argon.verify(password, compare));
    }

}

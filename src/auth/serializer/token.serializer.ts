import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {JwtToken} from '../interface/jwt-token.interface';

@Injectable()
export class TokenSerializer {

    constructor(private tokenService: JwtService) {
    }

    public encryptPayload<T>(payload: T): string {
        return this.tokenService.sign({data: payload as T});
    }

    public decryptPayload<T>(token: string): JwtToken<T> {
        return this.tokenService.decode(token) as JwtToken<T>;
    }

}

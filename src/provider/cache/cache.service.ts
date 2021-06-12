import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import {Cache} from 'cache-manager';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CacheService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    }

    public setKey(key: string, value: any, options: any): Observable<string> {
        return from(this.cacheManager.set(key, JSON.stringify(value), options));
    }

    public removeKey(key: string): Observable<string> {
        return from(this.cacheManager.del(key));
    }

    public getKey<T>(key: string): Observable<T> {
        return from(this.cacheManager.get<string>(key)).pipe(
            map(object => JSON.parse(object))
        );
    }

}

import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ModelService} from "../../common/service/model.service";
import {Account, AccountDocument, AccountPartial} from "./entity/account.entity";
import {from, Observable} from "rxjs";
import {EventEmitter2} from "@nestjs/event-emitter";
import {map, mergeMap} from "rxjs/operators";
import {AccountCreate} from "./entity/account-create.dto";

@Injectable()
export class AccountService extends ModelService<AccountDocument, AccountPartial> {

    constructor(
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
        private eventEmitter: EventEmitter2
    ) {
        super(accountModel);
    }

    public create(model: AccountCreate): Observable<AccountDocument> {
        return super.create(model).pipe(
            mergeMap(createdAccount =>
                from(
                    this.eventEmitter.emitAsync(
                        'account.create',
                    {account: createdAccount, initialValue: model.initialValue}
                    )
                ).pipe(
                    map(() => createdAccount)
                )
            )
        );
    }

}

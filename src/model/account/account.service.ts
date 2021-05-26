import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ModelService} from "../../common/service/model.service";
import {Account, AccountDocument, AccountPartial} from "./entity/account.entity";

@Injectable()
export class AccountService extends ModelService<AccountDocument, AccountPartial> {

    constructor(
        @InjectModel(Account.name) private accountModel: Model<AccountDocument>
    ) {
        super(accountModel);
    }

}

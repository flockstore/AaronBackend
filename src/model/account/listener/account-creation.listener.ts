import {Injectable} from "@nestjs/common";
import {OnEvent} from "@nestjs/event-emitter";
import {TransactionService} from "../../transaction/transaction.service";
import {AccountDocument} from "../entity/account.entity";
import {Transaction} from "../../transaction/entity/transaction.entity";

@Injectable()
export class AccountCreationListener {

    constructor(private transactionService: TransactionService) {
    }

    @OnEvent('account.create')
    onAccountCreation(event: {account: AccountDocument, initialValue: number}): void {
        this.transactionService.create({
            baseValue: event.initialValue,
            previousValue: 0,
            exchangeValue: event.initialValue,
            account: event.account._id,
            addition: true,
            related: {
                id: event.account._id,
                action: 'account_creation',
                meta: {}
            }
        } as Transaction);
    }

}

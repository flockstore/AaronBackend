import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PolicyGuard} from '../../permission/guard/policy.guard';
import {CheckPolicies} from '../../permission/interface/policy-handler.interface';
import {DefaultPolicyHandler} from '../../permission/ability/default-policy.handler';
import {Action} from '../../permission/interface/action.enum';
import {AccountService} from './account.service';
import {Account, AccountDocument} from './entity/account.entity';
import {AccountCreate} from './entity/account-create.dto';

@Controller('account')
export class AccountController {

    constructor(private accountService: AccountService) {
    }

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Account))
    create(@Body() account: AccountCreate): Observable<AccountDocument> {
        return this.accountService.create(account);
    }

    @Get(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Account))
    find(@Param('id') id: string): Observable<AccountDocument> {
        return this.accountService.get(id);
    }

    @Put(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Account))
    update(@Param('id') id: string, @Body() account: Account): Observable<AccountDocument> {
        return this.accountService.update(id, account);
    }

    @Delete(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Account))
    delete(@Param('id') id: string): Observable<boolean> {
        return this.accountService.delete(id);
    }

}

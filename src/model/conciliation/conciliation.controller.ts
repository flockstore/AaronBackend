import {Body, Controller, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PolicyGuard} from '../../permission/guard/policy.guard';
import {CheckPolicies} from '../../permission/interface/policy-handler.interface';
import {DefaultPolicyHandler} from '../../permission/ability/default-policy.handler';
import {Action} from '../../permission/interface/action.enum';
import {ConciliationService} from './conciliation.service';
import {Account} from '../account/entity/account.entity';
import {Conciliation, ConciliationDocument} from './entiy/conciliation.entity';

@Controller('conciliation')
export class ConciliationController {

    constructor(private conciliationService: ConciliationService) {
    }

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Account))
    create(@Body() conciliation: Conciliation): Observable<ConciliationDocument> {
        return this.conciliationService.create(conciliation);
    }

    @Get(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Read, Account))
    find(@Param('id') id: string): Observable<ConciliationDocument> {
        return this.conciliationService.get(id);
    }

    @Put('authorize/:id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Account))
    authorize(@Param('id') id: string, @Request() request): Observable<ConciliationDocument> {
        return this.conciliationService.authorize(id, request.user);
    }

}

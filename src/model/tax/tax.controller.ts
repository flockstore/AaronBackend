import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PolicyGuard} from '../../permission/guard/policy.guard';
import {CheckPolicies} from '../../permission/interface/policy-handler.interface';
import {DefaultPolicyHandler} from '../../permission/ability/default-policy.handler';
import {Action} from '../../permission/interface/action.enum';
import {TaxService} from './tax.service';
import {Tax, TaxDocument} from './entity/tax.entity';

@Controller('tax')
export class TaxController {

    constructor(private taxService: TaxService) {
    }

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Create, Tax))
    create(@Body() tax: Tax): Observable<TaxDocument> {
        return this.taxService.create(tax);
    }

    @Get(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Read, Tax))
    find(@Param('id') id: string): Observable<TaxDocument> {
        return this.taxService.get(id);
    }

    @Put(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Update, Tax))
    update(@Param('id') id: string, @Body() tax: Tax): Observable<TaxDocument> {
        return this.taxService.update(id, tax);
    }

    @Delete(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Delete, Tax))
    delete(@Param('id') id: string): Observable<boolean> {
        return this.taxService.delete(id);
    }

}

import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PolicyGuard} from '../../permission/guard/policy.guard';
import {CheckPolicies} from '../../permission/interface/policy-handler.interface';
import {DefaultPolicyHandler} from '../../permission/ability/default-policy.handler';
import {Action} from '../../permission/interface/action.enum';
import {FlowService} from './flow.service';
import {Flow, FlowDocument} from './entity/flow.entity';

@Controller('flow')
export class FlowController {

    constructor(private flowService: FlowService) {
    }

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Flow))
    create(@Body() account: Flow): Observable<FlowDocument> {
        return this.flowService.create(account);
    }

    @Get(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Flow))
    find(@Param('id') id: string): Observable<FlowDocument> {
        return this.flowService.get(id);
    }

    @Put(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Flow))
    update(@Param('id') id: string, @Body() flowCategory: Flow): Observable<FlowDocument> {
        return this.flowService.update(id, flowCategory);
    }

    @Delete(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Flow))
    delete(@Param('id') id: string): Observable<boolean> {
        return this.flowService.delete(id);
    }

}

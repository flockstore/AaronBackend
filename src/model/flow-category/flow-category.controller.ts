import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Observable} from "rxjs";
import {PolicyGuard} from "../../permission/guard/policy.guard";
import {CheckPolicies} from "../../permission/interface/policy-handler.interface";
import {DefaultPolicyHandler} from "../../permission/ability/default-policy.handler";
import {Action} from "../../permission/interface/action.enum";
import {FlowCategoryService} from "./flow-category.service";
import {FlowCategory, FlowCategoryDocument} from "./entity/flow-category.entity";

@Controller('flow-category')
export class FlowCategoryController {

    constructor(private flowCategoryService: FlowCategoryService) {
    }

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, FlowCategory))
    create(@Body() account: FlowCategory): Observable<FlowCategoryDocument> {
        return this.flowCategoryService.create(account);
    }

    @Get(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, FlowCategory))
    find(@Param('id') id: string): Observable<FlowCategoryDocument> {
        return this.flowCategoryService.get(id);
    }

    @Put(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, FlowCategory))
    update(@Param('id') id: string, @Body() flowCategory: FlowCategory): Observable<FlowCategoryDocument> {
        return this.flowCategoryService.update(id, flowCategory);
    }

    @Delete(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, FlowCategory))
    delete(@Param('id') id: string): Observable<boolean> {
        return this.flowCategoryService.delete(id);
    }

}

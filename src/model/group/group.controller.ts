import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {Observable} from 'rxjs';
import {GroupService} from './group.service';
import {Group, GroupDocument} from './entity/group.entity';
import {PolicyGuard} from '../../permission/guard/policy.guard';
import {CheckPolicies} from '../../permission/interface/policy-handler.interface';
import {DefaultPolicyHandler} from '../../permission/ability/default-policy.handler';
import {Action} from '../../permission/interface/action.enum';

@Controller('group')
export class GroupController {

    constructor(private groupService: GroupService) {
    }

    @Post()
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Group))
    create(@Body() group: Group): Observable<GroupDocument> {
        return this.groupService.create(group);
    }

    @Get(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Group))
    find(@Param('id') id: string): Observable<GroupDocument> {
        return this.groupService.get(id);
    }

    @Put(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Group))
    update(@Param('id') id: string, @Body() group: Group): Observable<GroupDocument> {
        return this.groupService.update(id, group);
    }

    @Delete(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, Group))
    delete(@Param('id') id: string): Observable<boolean> {
        return this.groupService.delete(id);
    }

}

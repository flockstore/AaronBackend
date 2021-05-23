import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Observable} from "rxjs";
import {Public} from "../../auth/guard/jwt-auth.guard";
import {GroupService} from "./group.service";
import {Group, GroupDocument} from "./entity/group.entity";

@Controller('group')
export class GroupController {

    constructor(private groupService: GroupService) {
    }

    @Post() @Public()
    create(@Body() group: Group): Observable<GroupDocument> {
        return this.groupService.create(group);
    }

    @Get(':id') @Public()
    find(@Param('id') id: string): Observable<GroupDocument> {
        return this.groupService.get(id);
    }

    @Put(':id') @Public()
    update(@Param('id') id: string, @Body() group: Group): Observable<GroupDocument> {
        return this.groupService.update(id, group);
    }

    @Delete(':id') @Public()
    delete(@Param('id') id: string): Observable<boolean> {
        return this.groupService.delete(id);
    }

}

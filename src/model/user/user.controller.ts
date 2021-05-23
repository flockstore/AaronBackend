import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserDocument} from "./entity/user.entity";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {UserCreate} from "./entity/dto/user-create.dto";
import {UserGroupAction} from "./entity/dto/user-group-action.dto";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Post()
    create(@Body() user: UserCreate): Observable<UserDocument> {
        return this.userService.create(user);
    }

    @Get(':id')
    find(@Param('id') id: string): Observable<UserDocument> {
        return this.userService.get(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: UserDocument): Observable<UserDocument> {
        return this.userService.update(id, user);
    }

    @Put('group/add')
    addGroup(@Body() action: UserGroupAction): Observable<UserDocument> {
        return this.userService.addGroup(action.user, action.group);
    }

    @Put('group/remove')
    removeGroup(@Body() action: UserGroupAction): Observable<UserDocument> {
        return this.userService.removeGroup(action.user, action.group);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<boolean> {
        return this.userService.delete(id);
    }

}

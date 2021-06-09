import {Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {User, UserDocument} from './entity/user.entity';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {UserCreate} from './entity/dto/user-create.dto';
import {UserGroupAction} from './entity/dto/user-group-action.dto';
import {PolicyGuard} from '../../permission/guard/policy.guard';
import {CheckPolicies} from '../../permission/interface/policy-handler.interface';
import {DefaultPolicyHandler} from '../../permission/ability/default-policy.handler';
import {Action} from '../../permission/interface/action.enum';
import {Public} from '../../auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Post() @Public()
    create(@Body() user: UserCreate): Observable<UserDocument> {
        return this.userService.create(user);
    }


    @Get('profile/me')
    profile(@Request() request): Observable<UserDocument> {
        return this.userService.get(request.user);
    }

    @Get(':id')
    find(@Param('id') id: string): Observable<UserDocument> {
        return this.userService.get(id);
    }

    @Put(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, User))
    update(@Param('id') id: string, @Body() user: UserDocument): Observable<UserDocument> {
        return this.userService.update(id, user);
    }

    @Put('group/add')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, User))
    addGroup(@Body() action: UserGroupAction): Observable<UserDocument> {
        return this.userService.addGroup(action.user, action.group);
    }

    @Put('group/remove')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, User))
    removeGroup(@Body() action: UserGroupAction): Observable<UserDocument> {
        return this.userService.removeGroup(action.user, action.group);
    }

    @Delete(':id')
    @UseGuards(PolicyGuard)
    @CheckPolicies(DefaultPolicyHandler.check(Action.Manage, User))
    delete(@Param('id') id: string): Observable<boolean> {
        return this.userService.delete(id);
    }

}

import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserDocument} from "./entity/user.entity";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {UserCreate} from "./entity/user-create.dto";
import {Public} from "../../auth/guard/jwt-auth.guard";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Post() @Public()
    create(@Body() user: UserCreate): Observable<UserDocument> {
        return this.userService.create(user);
    }

    @Get(':id') @Public()
    find(@Param('id') id: string): Observable<UserDocument> {
        return this.userService.get(id);
    }

    @Put(':id') @Public()
    update(@Param('id') id: string, @Body() user: UserDocument): Observable<UserDocument> {
        return this.userService.update(id, user);
    }

    @Delete(':id') @Public()
    delete(@Param('id') id: string): Observable<boolean> {
        return this.userService.delete(id);
    }

}

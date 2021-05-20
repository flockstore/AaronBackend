import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserDocument} from "./entities/user.entity";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {UserCreate} from "./entities/user-create.dto";

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
    update(@Param('id') id: string, @Body() user: UserCreate): Observable<UserDocument> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    delete(): void {

    }

}

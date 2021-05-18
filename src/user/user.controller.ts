import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {User, UserDocument} from "./model/user.schema";
import {UserService} from "./user.service";
import {Observable} from "rxjs";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Post()
    create(@Body() user: User): Observable<UserDocument> {
        return this.userService.create(user);
    }

    @Get()
    find(): void {

    }

    @Put()
    update(): void {

    }

    @Delete()
    delete(): void {

    }

}

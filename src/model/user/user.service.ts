import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument, UserPartial} from "./entity/user.entity";
import {Model} from "mongoose";
import {ModelService} from "../../common/service/model.service";

@Injectable()
export class UserService extends ModelService<UserDocument, UserPartial> {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {
        super(userModel);
    }

}

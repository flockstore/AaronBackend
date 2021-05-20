import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model} from "mongoose";
import {ModelService} from "../../common/service/model.service";
import {UserCreate} from "./entities/user-create.dto";

@Injectable()
export class UserService extends ModelService<UserDocument, UserCreate> {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {
        super(userModel);
    }

}

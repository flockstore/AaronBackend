import { UserDocument, UserPartial } from "./entities/user.entity";
import { Model } from "mongoose";
import { ModelService } from "../../common/service/model.service";
export declare class UserService extends ModelService<UserDocument, UserPartial> {
    private userModel;
    constructor(userModel: Model<UserDocument>);
}

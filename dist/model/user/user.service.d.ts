import { UserDocument } from "./entities/user.entity";
import { Model } from "mongoose";
import { ModelService } from "../../common/service/model.service";
import { UserCreate } from "./entities/user-create.dto";
export declare class UserService extends ModelService<UserDocument, UserCreate> {
    private userModel;
    constructor(userModel: Model<UserDocument>);
}

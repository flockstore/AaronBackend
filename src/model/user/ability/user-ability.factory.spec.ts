import permissionTest from "../../../../test/generic/permission-test.generic";
import {User} from "../entity/user.entity";
import {superPerms} from "../../group/entity/group.mock";

describe('UserAbilityFactory', () => {
    permissionTest(User, {user: superPerms});
});

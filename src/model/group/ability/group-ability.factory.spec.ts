import permissionTest from "../../../../test/generic/permission-test.generic";
import {superPerms} from "../entity/group.mock";
import {Group} from "../entity/group.entity";

describe('GroupAbilityFactory', () => {
    permissionTest(Group, {group: superPerms});
});

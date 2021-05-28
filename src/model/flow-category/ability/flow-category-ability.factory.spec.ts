import permissionTest from "../../../../test/generic/permission-test.generic";
import {superPerms} from "../../group/entity/group.mock";
import {Account} from "../../account/entity/account.entity";

describe('AccountAbilityFactory', () => {
    permissionTest(Account, {flow_category: superPerms});
});

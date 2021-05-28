import permissionTest from '../../../../test/generic/permission-test.generic';
import {Account} from '../entity/account.entity';
import {superPerms} from '../../group/entity/group.mock';

describe('AccountAbilityFactory', () => {
    permissionTest(Account, {account: superPerms});
});

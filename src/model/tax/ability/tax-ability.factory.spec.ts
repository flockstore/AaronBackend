import permissionTest from '../../../../test/generic/permission-test.generic';
import {Tax} from '../entity/tax.entity';
import {superPerms} from '../../group/entity/group.mock';

describe('TaxAbilityFactory', () => {
    permissionTest(Tax, {tax: superPerms});
});

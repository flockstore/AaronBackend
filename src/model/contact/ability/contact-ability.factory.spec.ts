import permissionTest from '../../../../test/generic/permission-test.generic';
import {Contact} from '../entity/contact.entity';
import {superPerms} from '../../group/entity/group.mock';

describe('ContactAbilityFactory', () => {
    permissionTest(Contact, {contact: superPerms});
});

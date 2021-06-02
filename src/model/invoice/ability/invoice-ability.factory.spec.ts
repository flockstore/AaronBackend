import permissionTest from '../../../../test/generic/permission-test.generic';
import {superPerms} from '../../group/entity/group.mock';
import {Invoice} from '../entity/invoice.entity';

describe('InvoiceAbilityFactory', () => {
    permissionTest(Invoice, {invoice: superPerms});
});

import permissionTest from '../../../../test/generic/permission-test.generic';
import {superPerms} from '../../group/entity/group.mock';
import {Product} from '../entity/product.entity';

describe('ProductAbilityFactory', () => {
    permissionTest(Product, {product: superPerms});
});

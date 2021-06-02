import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {map, mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {InvoiceService} from './invoice.service';
import {ProductModule} from '../product/product.module';
import {ContactModule} from '../contact/contact.module';
import {ProductService} from '../product/product.service';
import {ContactService} from '../contact/contact.service';
import {productMock} from '../product/entity/product.mock';
import {contactMock} from '../contact/entity/contact.mock';
import functionHelper from './entity/invoice.mock';
import {TaxModule} from '../tax/tax.module';
import {TaxService} from '../tax/tax.service';
import {taxMock} from '../tax/entity/tax.mock';
import {InvoiceModule} from './invoice.module';

describe('InvoiceService', () => {

    let service: InvoiceService;
    let productService: ProductService;
    let contactService: ContactService;
    let taxService: TaxService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                ProductModule,
                ContactModule,
                TaxModule,
                InvoiceModule
            ]
        }).compile();

        service = module.get<InvoiceService>(InvoiceService);
        productService = module.get<ProductService>(ProductService);
        contactService = module.get<ContactService>(ContactService);
        taxService = module.get<TaxService>(TaxService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a invoice', done => {

        productService.create(productMock).pipe(
            mergeMap(product =>
                contactService.create(contactMock).pipe(
                    map(contact => ({product, contact}))
                )
            ),
            mergeMap(baseCompound =>
                taxService.create(taxMock).pipe(
                    map(tax => ({...baseCompound, tax}))
                )
            ),
            mergeMap(compound =>
                service.create(
                    functionHelper.generateInvoice(compound.contact, [compound.product], [compound.tax], false)
                )
            )
        ).subscribe(
            response => {
                expect(response).toHaveProperty('_id');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );
    });

    /*
    it('should update a product', done => {

        service.create(productMock).pipe(
            mergeMap(product => service.update(product._id, {name: 'Paper'} as any))
        ).subscribe(
            response => {
                expect(response.name).toBe('Paper');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should soft delete a product', done => {

        service.create(productMock).pipe(
            mergeMap(product => service.delete(product._id))
        ).subscribe(
            response => {
                expect(response).toBe(true);
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });
     */

    afterEach(async () => {
        await closeInMongodConnection();
    });

});

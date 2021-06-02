import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {map, mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {InvoiceService} from './invoice.service';
import {ProductService} from '../product/product.service';
import {ContactService} from '../contact/contact.service';
import {TaxService} from '../tax/tax.service';
import {InvoiceController} from './invoice.controller';
import {ProductModule} from '../product/product.module';
import {ContactModule} from '../contact/contact.module';
import {TaxModule} from '../tax/tax.module';
import {InvoiceModule} from './invoice.module';
import {productMock} from '../product/entity/product.mock';
import {contactMock} from '../contact/entity/contact.mock';
import {taxMock} from '../tax/entity/tax.mock';
import functionHelper from './entity/invoice.mock';
import {Invoice} from './entity/invoice.entity';

describe('InvoiceController', () => {

    let service: InvoiceService;
    let productService: ProductService;
    let contactService: ContactService;
    let taxService: TaxService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                ProductModule,
                ContactModule,
                TaxModule,
                InvoiceModule
            ],
            controllers: [InvoiceController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<InvoiceService>(InvoiceService);
        productService = module.get<ProductService>(ProductService);
        contactService = module.get<ContactService>(ContactService);
        taxService = module.get<TaxService>(TaxService);
        await app.init();

    });

    it('/invoice (POST)', () => {

        return productService.create(productMock).pipe(
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
            map(compound =>
                request(app.getHttpServer())
                    .post('/invoice')
                    .send(functionHelper.generateInvoice(
                        compound.contact,
                        [compound.product],
                        [compound.tax],
                        false
                    ))
                    .expect(201)
                    .expect(res => res.body instanceof Invoice)
            )
        ).toPromise();
    });

    /*
    it('/product/:id (GET)', () => {
        return service.create(productMock).pipe(
            map(product =>
                request(app.getHttpServer())
                    .get('/product/' + product._id)
                    .expect(200)
                    .expect(res => res.body instanceof Product)
            )
        ).toPromise();
    });

    it('/product/:id (PUT)', () => {
        return service.create(productMock).pipe(
            map(product =>
                request(app.getHttpServer())
                    .put('/product/' + product._id)
                    .send({...product, name: 'Accessory'})
                    .expect(200)
                    .expect(res => res.body instanceof Product && res.body.name === 'Accessory')
            )
        ).toPromise();
    });

    it('/product/:id (DELETE)', () => {
        return service.create(productMock).pipe(
            map(product =>
                request(app.getHttpServer())
                    .delete('/product/' + product._id)
                    .expect(200)
                    .expect(res => res.body === true)
            )
        ).toPromise();
    });
     */

    afterEach(async () => {
        await closeInMongodConnection();
        await app.close();
    });

});

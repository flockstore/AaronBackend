import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {map} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {ProductModule} from './product.module';
import {ProductController} from './product.controller';
import {productMock} from './entity/product.mock';
import {ProductService} from './product.service';
import {Product} from './entity/product.entity';

describe('ContactController', () => {

    let service: ProductService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                ProductModule
            ],
            controllers: [ProductController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<ProductService>(ProductService);
        await app.init();

    });

    it('/product (POST)', () => {
        return request(app.getHttpServer())
            .post('/product')
            .send(productMock)
            .expect(201)
            .expect(res => res.body instanceof Product);
    });

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

    afterEach(async () => {
        await closeInMongodConnection();
        await app.close();
    });

});

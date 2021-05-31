import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {map} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {TaxService} from './tax.service';
import {TaxController} from './tax.controller';
import {taxMock} from './entity/tax.mock';
import {Tax} from './entity/tax.entity';
import {TaxModule} from './tax.module';

describe('ContactController', () => {

    let service: TaxService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                TaxModule
            ],
            controllers: [TaxController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<TaxService>(TaxService);
        await app.init();

    });

    it('/tax (POST)', () => {
        return request(app.getHttpServer())
            .post('/tax')
            .send(taxMock)
            .expect(201)
            .expect(res => res.body instanceof Tax);
    });

    it('/tax/:id (GET)', () => {
        return service.create(taxMock).pipe(
            map(tax =>
                request(app.getHttpServer())
                    .get('/tax/' + tax._id)
                    .expect(200)
                    .expect(res => res.body instanceof Tax)
            )
        ).toPromise();
    });

    it('/tax/:id (PUT)', () => {
        return service.create(taxMock).pipe(
            map(tax =>
                request(app.getHttpServer())
                    .put('/tax/' + tax._id)
                    .send({...tax, name: 'IVA 20%'})
                    .expect(200)
                    .expect(res => res.body instanceof Tax && res.body.name === 'IVA 20%')
            )
        ).toPromise();
    });

    it('/tax/:id (DELETE)', () => {
        return service.create(taxMock).pipe(
            map(tax =>
                request(app.getHttpServer())
                    .delete('/tax/' + tax._id)
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

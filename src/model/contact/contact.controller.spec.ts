import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {map} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {ContactModule} from './contact.module';
import {ContactService} from './contact.service';
import {ContactController} from './contact.controller';
import {contactMock} from './entity/contact.mock';
import {Contact} from './entity/contact.entity';

describe('ContactController', () => {

    let service: ContactService;
    let app: INestApplication;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                ContactModule
            ],
            controllers: [ContactController]
        }).compile();

        app = module.createNestApplication();
        service = module.get<ContactService>(ContactService);
        await app.init();

    });

    it('/contact (POST)', () => {
        return request(app.getHttpServer())
            .post('/contact')
            .send(contactMock)
            .expect(201)
            .expect(res => res.body instanceof Contact);
    });

    it('/contact/:id (GET)', () => {
        return service.create(contactMock).pipe(
            map(contact =>
                request(app.getHttpServer())
                    .get('/contact/' + contact._id)
                    .expect(200)
                    .expect(res => res.body instanceof Contact)
            )
        ).toPromise();
    });

    it('/contact/:id (PUT)', () => {
        return service.create(contactMock).pipe(
            map(contact =>
                request(app.getHttpServer())
                    .put('/contact/' + contact._id)
                    .send({...contact, name: 'Jonas'})
                    .expect(200)
                    .expect(res => res.body instanceof Contact && res.body.name === 'Jonas')
            )
        ).toPromise();
    });

    it('/contact/:id (DELETE)', () => {
        return service.create(contactMock).pipe(
            map(contact =>
                request(app.getHttpServer())
                    .delete('/contact/' + contact._id)
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

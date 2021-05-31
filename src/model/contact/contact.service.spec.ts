import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from '../../../test/utilities/mongoose-memory.helper';
import {mergeMap} from 'rxjs/operators';
import {PermissionModule} from '../../permission/permission.module';
import {ContactService} from './contact.service';
import {ContactModule} from './contact.module';
import {contactMock} from './entity/contact.mock';

describe('ContactService', () => {

    let service: ContactService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                ContactModule
            ]
        }).compile();

        service = module.get<ContactService>(ContactService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a contact', done => {
        service.create(contactMock).subscribe(
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

    it('should update a contact', done => {

        service.create(contactMock).pipe(
            mergeMap(contact => service.update(contact._id, {name: 'Ian'} as any))
        ).subscribe(
            response => {
                expect(response.name).toBe('Ian');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should soft delete a contact', done => {

        service.create(contactMock).pipe(
            mergeMap(group => service.delete(group._id))
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

    afterEach(async () => {
        await closeInMongodConnection();
    });

});

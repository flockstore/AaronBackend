import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from "../../../test/mongoose-memory.helper";
import {GroupService} from "./group.service";
import {GroupDocument} from "./entity/group.entity";
import {mergeMap} from "rxjs/operators";
import {groupMock} from "./entity/group.mock";
import {GroupModule} from "./group.module";

describe('GroupService', () => {

    let service: GroupService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                GroupModule
            ]
        }).compile();

        service = module.get<GroupService>(GroupService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a group', done => {
        service.create(groupMock).subscribe(
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

    it('should update a group', done => {

        service.create(groupMock).pipe(
            mergeMap(group => service.update(group._id, {name: 'Moderator'} as GroupDocument))
        ).subscribe(
            response => {
                expect(response.name).toBe('Moderator');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should soft delete a group', done => {

        service.create(groupMock).pipe(
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

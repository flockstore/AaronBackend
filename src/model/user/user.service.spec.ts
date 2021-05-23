import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {UserDocument} from "./entity/user.entity";
import {closeInMongodConnection, rootMongooseTestModule} from "../../../test/mongoose-memory.helper";
import {map, mergeMap} from "rxjs/operators";
import {UserCreate} from "./entity/dto/user-create.dto";
import {userMock} from "./entity/user.mock";
import {GroupModule} from "../group/group.module";
import {GroupService} from "../group/group.service";
import {groupMock} from "../group/entity/group.mock";
import {Observable} from "rxjs";
import {GroupDocument} from "../group/entity/group.entity";
import {UserModule} from "./user.module";

describe('UserService', () => {

    let service: UserService;
    let groupService: GroupService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                GroupModule,
                UserModule
            ]
        }).compile();

        service = module.get<UserService>(UserService);
        groupService = module.get<GroupService>(GroupService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create an user', done => {
        service.create(userMock).subscribe(
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

    it('should NOT create a duplicated email user', done => {
        createAndValidateSuccess(done, userMock);
        createAndValidateError(done, userMock);
    });

    it('should NOT create an invalid email user', done => {
        createAndValidateError(done, {...userMock, email: 'demo.com'} as UserCreate);
    });

    it('should update an user', done => {

        service.create(userMock).pipe(
            mergeMap(user => service.update(user._id, {name: 'Jonas'} as UserCreate))
        ).subscribe(
            response => {
                expect(response.name).toBe('Jonas');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should NOT add a group', done => {

        service.create(userMock).pipe(
            mergeMap(user => service.update(
                user._id,
                {name: 'Jonas', groups: {$push: {joinedAt: new Date(), group: ''}}} as any)
            )
        ).subscribe(
            response => {
                expect(response.groups.length === 0).toBe(true);
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );

    });

    it('should ADD user to group', done => {
        createGroupAndAdd().subscribe(
            response => {
                expect(response.user.groups[0]).toBeDefined();
                expect(response.user.groups[0]).toHaveProperty('group');
                expect(response.user.groups[0]).toHaveProperty('joinedAt');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );
    });

    it('should DELETE user to group', done => {
        createGroupAndAdd().pipe(
            mergeMap(compound =>
                service.removeGroup(compound.user._id, compound.group._id)
            )
        ).subscribe(
            response => {
                expect(response.groups.length === 0).toBe(true);
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );
    });

    it('should soft delete an user', done => {

        service.create(userMock).pipe(
            mergeMap(user => service.delete(user._id))
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

    function createAndValidateSuccess(done, user: UserCreate) {
        service.create(user).subscribe(
            response => {
                expect(response).toHaveProperty('_id');
                done();
            },
            error => {
                expect(error).toBeNull();
                done();
            }
        );
    }

    function createAndValidateError(done, user: UserCreate) {
        service.create(user).subscribe(
            response => {
                expect(response).toBeNull();
                done();
            },
            error =>  {
                expect(error).not.toBeNull();
                done();
            }
        );
    }

    function createGroupAndAdd():Observable<{user: UserDocument, group: GroupDocument}> {
        return service.create(userMock).pipe(
            mergeMap(user =>
                groupService.create(groupMock).pipe(
                    mergeMap(group =>
                        service.addGroup(user._id, group._id).pipe(
                            map(updatedUser => ({user: updatedUser, group}))
                        )
                    )
                )
            )
        );
    }

});

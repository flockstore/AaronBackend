
import {GroupService} from "../group.service";
import {Test, TestingModule} from "@nestjs/testing";
import {GroupModule} from "../group.module";
import {closeInMongodConnection, rootMongooseTestModule} from "../../../../test/mongoose-memory.helper";
import {Observable} from "rxjs";
import {Group, GroupDocument} from "../entity/group.entity";
import {map, mergeMap} from "rxjs/operators";
import {groupMock, superPerms} from "../entity/group.mock";
import {PermissionModule} from "../../../permission/permission.module";
import {AbilityCompoundFactory} from "../../../permission/ability/ability-compound.factory";
import {Action} from "../../../permission/interface/action.enum";
import {UserService} from "../../user/user.service";
import {UserModule} from "../../user/user.module";
import {UserDocument} from "../../user/entity/user.entity";
import {userMock} from "../../user/entity/user.mock";

describe('UserAbilityFactory', () => {

    let service: UserService;
    let groupService: GroupService;
    let compoundFactory: AbilityCompoundFactory;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                GroupModule,
                UserModule,
                PermissionModule
            ]
        }).compile();

        service = module.get<UserService>(UserService);
        groupService = module.get<GroupService>(GroupService);
        compoundFactory = module.get<AbilityCompoundFactory>(AbilityCompoundFactory);

    });

    it('should create the services', () => {
        expect(service).toBeDefined();
        expect(groupService).toBeDefined();
    });

    it('should HAVE management permissions on group', done => {
        createGroupAndAdd().subscribe(
            response => {
                const permissions = compoundFactory.constructType(response.user);
                expect(permissions.can(Action.Read, Group)).toBe(true);
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

    function createGroupAndAdd():Observable<{user: UserDocument, group: GroupDocument}> {
        return service.create(userMock).pipe(
            mergeMap(user =>
                groupService.create({...groupMock, permissions: {group: superPerms}} as any).pipe(
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

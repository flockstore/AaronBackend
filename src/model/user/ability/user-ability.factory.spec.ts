import {UserService} from "../user.service";
import {GroupService} from "../../group/group.service";
import {Test, TestingModule} from "@nestjs/testing";
import {GroupModule} from "../../group/group.module";
import {closeInMongodConnection, rootMongooseTestModule} from "../../../../test/mongoose-memory.helper";
import {UserDocument} from "../entity/user.entity";
import {UserModule} from "../user.module";
import {Observable} from "rxjs";
import {GroupDocument} from "../../group/entity/group.entity";
import {userMock} from "../entity/user.mock";
import {map, mergeMap} from "rxjs/operators";
import {groupMock} from "../../group/entity/group.mock";
import {PermissionModule} from "../../../permission/permission.module";
import {AbilityCompoundFactory} from "../../../permission/ability/ability-compound.factory";

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

    it('should ADD user to group', done => {
        createGroupAndAdd().subscribe(
            response => {
                const permissions = compoundFactory.constructType(response.user);
                expect(permissions).toBeDefined();
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

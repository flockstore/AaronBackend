import { Test, TestingModule } from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import {closeInMongodConnection, rootMongooseTestModule} from "../../../test/mongoose-memory.helper";
import {Group, GroupDocument, GroupSchema} from "./entity/group.entity";
import {GroupService} from "./group.service";
import {PermissionRegistry} from "./entity/permission-registry.entity";

describe('GroupService', () => {

    let service: GroupService;
    const validGroup: GroupDocument = {
        name: 'Administrator',
        color: 'ffffff',
        priority: 1,
        permissions: {} as PermissionRegistry
    } as GroupDocument;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([
                    {
                        name: Group.name,
                        schema: GroupSchema
                    }
                ])
            ],
            providers: [GroupService]
        }).compile();

        service = module.get<GroupService>(GroupService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a group', done => {
        service.create(validGroup).subscribe(
            response => {
                expect((response instanceof Group)).toBe(true);
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

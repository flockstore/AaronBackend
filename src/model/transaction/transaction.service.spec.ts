import {Test, TestingModule} from '@nestjs/testing';
import {closeInMongodConnection, rootMongooseTestModule} from "../../../test/utilities/mongoose-memory.helper";
import {PermissionModule} from "../../permission/permission.module";
import {TransactionService} from "./transaction.service";
import {TransactionModule} from "./transaction.module";
import {transactionMock} from "./entity/transaction.mock";

describe('TransactionService', () => {

    let service: TransactionService;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                PermissionModule,
                TransactionModule
            ]
        }).compile();

        service = module.get<TransactionService>(TransactionService);

    });

    it('should create the service', () => {
        expect(service).toBeDefined();
    });

    it('should create a transaction', done => {
        service.create(transactionMock).subscribe(
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

    afterEach(async () => {
        await closeInMongodConnection();
    });

});

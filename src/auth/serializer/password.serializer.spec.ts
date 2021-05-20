
import {Test, TestingModule} from "@nestjs/testing";
import {PasswordSerializer} from "./password.serializer";
import {mergeMap} from "rxjs/operators";

describe('PasswordSerializer', () => {

    let passwordSerializer: PasswordSerializer;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [PasswordSerializer]
        }).compile();

        passwordSerializer = module.get<PasswordSerializer>(PasswordSerializer);

    });

    it('should be defined', function () {
        expect(passwordSerializer).toBeDefined();
    });

    it('should serialize a password', done => {

        passwordSerializer.serialize('adidas24').pipe(
            mergeMap(serialized => passwordSerializer.validate(serialized.hash, 'adidas24'))
        ).subscribe(

            response => {
                console.log(response);
                expect(response).toBeDefined();
                expect(response).toBe(true);
                done();
            },

            error => {
                expect(error).toBeNull();
                done();
            }

        );


    });

});

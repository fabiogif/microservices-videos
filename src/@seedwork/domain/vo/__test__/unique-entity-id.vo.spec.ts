import InvalidUuidError from "../../../errors/invalid-uuid-error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from 'uuid';


describe("uniqueEntityId Unit test", () => {

    function spyValidateMethod(){
        return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    }

    it('should throw error when uuid is invalid' , () =>{
        const validateSpy = spyValidateMethod();
        expect(()=> new UniqueEntityId("fake id")).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    })

    it('should accept a uuid passed in constructor', () => {
        const validateSpy = spyValidateMethod();
        const uuid = '3e9c5305-bf18-40dd-b6fb-6ecabe683b2b';
        const vo =  new UniqueEntityId(uuid);
        expect(vo.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })
    it('should accept a uuid passed in constructor', () => {
        const validateSpy = spyValidateMethod();
        const vo =  new UniqueEntityId()
        expect(uuidValidate(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    })
});
import { deepFreeze } from "../object";

describe('object Unit Test', ()=>{
    it('should must a immutable obj', () =>{
        let str = deepFreeze('a');
        expect( typeof str).toBe('string');

        let boolean = deepFreeze(true);
        expect( typeof boolean).toBe('boolean');

        boolean = deepFreeze(false);
        expect( typeof boolean).toBe('boolean');

        const num = deepFreeze(5);
        expect(typeof num).toBe("number");
     });
     it("should be a immutable object", () => {
        const obj = deepFreeze({
            prop1: "value1",
            deep: { prop2: "value2", prop3: new Date()}
        })
        expect( () => { 
            (obj as any).prop1 = "aaaaa";
        }).toThrow(
            "Cannot assign to read only property 'prop1' of object '#<Object>'"
        );
     });
});
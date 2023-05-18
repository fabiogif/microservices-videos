import { stringify } from "querystring";
import ValidationError from "../errors/validation-error";
import ValidatorRules from "./validator-rule";

describe("ValidatorRules unit Test", () =>{
    test("values method", () =>{
        const validator = ValidatorRules.values("some value", 'field');
        expect(validator).toBeInstanceOf(ValidatorRules);
        expect(validator['value']).toBe('some value');
        expect(validator['property']).toBe('field');
    });

    test("required validator", () => {
        let arrange: {value: any, property: string, messageError:string  }[] = [
            {value: null, property: 'field', messageError: 'Preencha field o campo'},
            {value: undefined, property: 'field', messageError: 'Preencha field o campo'},
            {value: "", property: 'field', messageError: 'Preencha field o campo'},
        ];

        arrange.forEach( item =>{
            expect( () => {
                ValidatorRules.values(item.value, item.property).required();
            }).toThrow(new ValidationError( item.messageError));
        });
     
        arrange = [
            {value: "test", property: 'field', messageError: 'Preencha field o campo'},
            {value: 5, property: 'field', messageError: 'Preencha field o campo'},
            {value: false, property: 'field', messageError: 'Preencha field o campo'},
        ];

          arrange.forEach( item =>{
            expect( () => {
                ValidatorRules.values(item.value, item.property).required();
            }).not.toThrow(new ValidationError( item.messageError));
        });
    });
});
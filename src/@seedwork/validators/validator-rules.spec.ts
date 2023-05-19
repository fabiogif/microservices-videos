import ValidationError from "../errors/validation-error";
import ValidatorRules from "./validator-rule";

type Values = {
    value: any,
    property: string
} 

type ExpectedRule = {
    value: any;
    property: string;
    rule: keyof ValidatorRules;
    error: ValidationError;
    params?: any[];

}
function assertIsInvalid({value, property, rule , error, params = []}:ExpectedRule){
    expect( () => {
       const validator =  ValidatorRules.values(value, property);
       const method = validator[rule];
       method.apply(validator, params);
    }).toThrow(error);
}

function assertIsValid({value, property, rule , error, params = []}:ExpectedRule ){
    expect( () => {
        const validator =  ValidatorRules.values(value, property);
        const method = validator[rule];
        method.apply(validator, params);
     }).not.toThrow(error);
}


describe("ValidatorRules unit Test", () =>{
    test("values method", () =>{
        const validator = ValidatorRules.values("some value", 'field');
        expect(validator).toBeInstanceOf(ValidatorRules);
        expect(validator['value']).toBe('some value');
        expect(validator['property']).toBe('field');
    });

    test("required validator", () => {
        let arrange: Values[] = [
            {value: null, property: 'field'},
            {value: undefined, property: 'field'},
            {value: "", property: 'field'},
        ];

        arrange.forEach( item =>{
            assertIsInvalid({value: item.value, property: item.property, rule: 'required', error: new ValidationError('Preencha field o campo')})
        });
     
        arrange = [
            {value: "test", property: 'field'},
            {value: 5, property: 'field'},
            {value: false, property: 'field'},
        ];

          arrange.forEach( item =>{
            assertIsValid({value: item.value, property: item.property, rule: 'required', error: new ValidationError('Preencha field o campo')})
        });
    });

    test("required validation rule", () =>{
        
        let arrange: Values[] = [
            {value: 5, property: 'field'},
            {value: {}, property: 'field'},
            {value: false, property: 'field'},
        ];
        const erroMenssage = new ValidationError('O campo field precisa ser uma string');

        arrange.forEach( item =>{
            assertIsInvalid({value: item.value, property: item.property, rule: 'string', error: erroMenssage})
        });
     
        arrange = [
            {value: "test", property: 'field'}
        ];

          arrange.forEach( item =>{
            assertIsValid({value: item.value, property: item.property, rule: 'string', error: erroMenssage})
        });
    });

    test("maxlength validation rule", () =>{
        let arrange: Values[] = [
            {value: "aaaaaa", property: 'field'},
        ];
        const erroMenssage = new ValidationError('O campo field precisa ser menor que 5');

        arrange.forEach( item =>{
            assertIsInvalid({value: item.value, property: item.property, rule: 'maxlength', error: erroMenssage, params:[5]})
        });

        arrange = [
            {value: "aaaaa", property: 'field'}
        ];
        arrange.forEach( item =>{
            assertIsValid({value: item.value, property: item.property, rule: 'maxlength', error: erroMenssage, params:[5]})
        });
    });

});
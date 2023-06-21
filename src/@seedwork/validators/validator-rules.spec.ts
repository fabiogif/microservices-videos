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
function assertIsInvalid(expected: ExpectedRule){
    expect( () => {
        runRule(expected);
    }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule){
    expect( () => {
        runRule(expected);
    }).not.toThrow(expected.error);
}

function runRule({ value, property, rule, params = []}: Omit<ExpectedRule, "error">){
    const validator =  ValidatorRules.values(value, property);
    const method = validator[rule];
    //method.apply(validator, params);
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
            {value: "test", property: 'field'},
            {value: null, property: 'field'},
            {value: undefined, property: 'field'}
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
            {value: "aaaaa", property: 'field'},
            {value: null, property: 'field'},
            {value: undefined, property: 'field'}
        ];
        arrange.forEach( item =>{
            assertIsValid({value: item.value, property: item.property, rule: 'maxlength', error: erroMenssage, params:[5]})
        });
    });

    test("boolean validation rule", () =>{
        let arrange: Values[] = [
            {value: 5 , property: 'field'},
            {value: "false" , property: 'field'},
            {value: "aaaaaa", property: 'field'},
        ];
        const erroMenssage = new ValidationError('O field deve ser um booleano');

        arrange.forEach( item =>{
            assertIsInvalid({value: item.value, property: item.property, rule: 'boolean', error: erroMenssage, params:[5]})
        });

        arrange = [
            {value: false, property: 'field'},
            {value: true, property: 'field'}
        ];
        arrange.forEach( item =>{
            assertIsValid({value: item.value, property: item.property, rule: 'boolean', error: erroMenssage, params:[5]})
        });
    });

    it("should combine two or more validation rules", ()=>{
        let validator = ValidatorRules.values(null, "field");
        expect(() => {validator.required().string()}).toThrow( new ValidationError("Preencha field o campo"));
        
        validator =  ValidatorRules.values(5, "field");
        expect(() => {validator.required().string()}).toThrow( new ValidationError("O campo field precisa ser uma string"));

        validator =  ValidatorRules.values("aaaaaa", "field");

        expect(() => {
            validator.required().string().maxlength(5);
        }).toThrow( new ValidationError("O campo field precisa ser menor que 5"));


    });

});
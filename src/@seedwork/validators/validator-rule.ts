import ValidationError from "../errors/validation-error";

export default class ValidatorRules{

    private constructor(private value: any, private property: string){

    }
    static values(value: any, property: string){
        return new ValidatorRules(value, property);
    }
    required():this{ 
         if(this.value === null || this.value === undefined || this.value === ""){
            throw  new ValidationError(`Preencha ${this.property} o campo`)
         }
        return this 
    }
        
    

    string():this{ 
        if(typeof this.value != "string"){
            throw  new ValidationError(`O campo  ${this.property} precisa ser uma string`)
        }
        return this
     }

    maxlength(max: number): this{ 
            if(this.value.length > max){
                throw  new ValidationError(`O campo  ${this.property} precisa ser menor que ${max}`)
            }
        return this
     }
}
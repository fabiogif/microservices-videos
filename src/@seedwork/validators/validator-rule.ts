import exp from "constants";
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
        if(!isEmpty(this.value) && typeof this.value != "string"){
            throw  new ValidationError(`O campo ${this.property} precisa ser uma string`)
        }
        return this
     }

    maxlength(max: number): this{ 
            if(!isEmpty(this.value) && this.value.length > max){
                throw  new ValidationError(`O campo ${this.property} precisa ser menor que ${max}`)
            }
        return this
     }
    boolean(): Omit<this, 'boolean'> {
        if (!isEmpty(this.value) && typeof this.value !== "boolean") {
        throw new ValidationError(`O ${this.property} deve ser um booleano`);
        }
        return this;
    }
}

export function isEmpty(value: any){
    return value === undefined || value === null
}
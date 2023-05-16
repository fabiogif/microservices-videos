
import InvalidUuidError from '../../../@seedwork/errors/invalid-uuid-error';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import VO from './vo';


export default class UniqueEntityId extends VO<string>{
    
    constructor(readonly id?: string){
     super(id || uuidv4());
     this.validate();
    }
    
    private validate() {
        const isValid = uuidValidate(this.value);
        if(!isValid){
            throw new InvalidUuidError();
        }
        
    }
}
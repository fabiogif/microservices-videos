import ClassValidatorFiels from '../class-validator-fields';

class SubClassValidatorFiels extends ClassValidatorFiels <{field: string}>{

}

describe('ClassValidatorFiels unit Test', ()=>{
    it('should initialize error and validatedData variables with null', ()=>{
        const validator = new SubClassValidatorFiels();
        expect( validator.errors).toBeNull();
        expect( validator.validatedData).toBeNull();
    });
    it('should initialize error and validatedData variables with null', ()=>{
    });
})
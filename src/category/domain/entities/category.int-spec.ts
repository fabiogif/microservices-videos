import ValidationError from "../../../@seedwork/errors/validation-error";
import { Category } from "./category";

describe("Category integration test", () =>{
   describe("create category test" , ()=> {
    it('should a invalid category ' ,()=>{
        expect(() => new Category({ name: null})).toThrow(
            new ValidationError('Preencha name o campo')
        );
    
        expect(() => new Category({ name: ""})).toThrow(
            new ValidationError('Preencha name o campo')
        );
    
        expect(() => new Category({ name: "t".repeat(256)})).toThrow(
            new ValidationError('O campo name precisa ser menor que 255')
        );
    
        expect(() => new Category({ name: 4 as any})).toThrow(
            new ValidationError('O campo name precisa ser uma string')
        );
       })
    
       it('should a invalid category for description' ,()=>{
        expect(() => new Category({ name: "Movie", description: 5 as any})).toThrow(
            new ValidationError('O campo description precisa ser uma string')
        );
       })
       it('should a invalid is_active for description' ,()=>{
        expect(() => new Category({ name: "Movie", is_active: 'true' as any})).toThrow(
            new ValidationError('O is_active deve ser um booleano')
        );
       })
   });

   describe("update category test" , () => {
    it('should a invalid category ' ,()=>{
        let categoryName = new Category({name: "Movie"});


        expect(() => new Category({ name: null})).toThrow(
            new ValidationError('Preencha name o campo')
        );
    
        expect(() => new Category({ name: ""})).toThrow(
            new ValidationError('Preencha name o campo')
        );
    
        expect(() => new Category({ name: "t".repeat(256)})).toThrow(
            new ValidationError('O campo name precisa ser menor que 255')
        );
    
        expect(() => new Category({ name: 4 as any})).toThrow(
            new ValidationError('O campo name precisa ser uma string')
        );
       })
    
       it('should a invalid category for description' ,()=>{
        expect(() => new Category({ name: "Movie", description: 5 as any})).toThrow(
            new ValidationError('O campo description precisa ser uma string')
        );
       })

   });

});
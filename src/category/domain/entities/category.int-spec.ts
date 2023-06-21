import { error } from "console";
import ValidationError from "../../../@seedwork/errors/validation-error";
import { Category } from "./category";

describe("Category integration test", () =>{

    describe("Create method", ()=> {
        it("should a invalid category when create", () => {
            expect(() => new Category({name: null})).toThrow(
                new ValidationError( "Preencha name o campo")
            );
            expect(() => new Category({name: ""})).toThrow(
                new ValidationError( "Preencha name o campo")
            );
            expect(() => new Category({name: "t".repeat(256)})).toThrow(
                new ValidationError( "O campo name precisa ser menor que 255")
            );
            expect(() => new Category({name: 5 as any })).toThrow(
                new ValidationError( "O campo name precisa ser uma string")
            );
        })
    
        it("should a invalid category using description property", () =>{
            expect(() => new Category( { name: "Movie", description: 5 as any})).toThrow(
                new ValidationError("O campo description precisa ser uma string")
            )
        })
    });

    describe("Update method", ()=> {
        it("should a invalid category when create", () => {
            let category = new Category({name: "Movie"})

            expect(() => category.update(null, null)).toThrow(
                new ValidationError( "Preencha name o campo")
            );
            expect(() => category.update("", null)).toThrow(
                new ValidationError( "Preencha name o campo")
            );

            expect(() => category.update( "t".repeat(256),  null)).toThrow(
                new ValidationError( "O campo name precisa ser menor que 255")
            );
            expect(() => category.update( 5 as any , null)).toThrow(
                new ValidationError( "O campo name precisa ser uma string")
            );
        });
    });
   
});
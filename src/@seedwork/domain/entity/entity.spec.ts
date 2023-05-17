import UniqueEntityId from "../vo/unique-entity-id.vo";
import Entity from "./entity"
import { validate as uuidValida } from "uuid";
class StubEntity extends Entity< {prop1: string, prop2: number} >{
}

describe("Entity Unit test", () => {
   it("Should set props and id ", ()=>{
    const arrange = { prop1: "prop1 value1", prop2: 23};
    const entity = new StubEntity(arrange);
    expect( entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect( entity.id).not.toBeNull();
    expect(uuidValida(entity.id)).toBeTruthy();
   });

   it('should accept a valida uuid', ()=> {
      const arrange =  { prop1: "prop1 value1", prop2: 23};
      const uniqueEntityId = new UniqueEntityId();
      const entity = new StubEntity(arrange, uniqueEntityId);

      expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
      expect(entity.id).toBe(uniqueEntityId.value);
   });

   it('should conver a entity to a Javascript object', () => {
      const arrange =  { prop1: "prop1 value1", prop2: 23};
      const uniqueEntityId = new UniqueEntityId();
      const entity = new StubEntity(arrange, uniqueEntityId);

      expect(entity.toJSON()).toStrictEqual({
         id: entity.id,
         ... arrange,
      });
   });
});
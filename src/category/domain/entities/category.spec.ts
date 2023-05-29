import { Category, CategoryProperties } from "./category";
import { omit } from 'lodash';
import UniqueEntityId from "../../../@seedwork/domain/vo/unique-entity-id.vo";


describe('Category Tests', () => {
    beforeEach(() =>{
        Category.validate = jest.fn();
    });
    test('constructor of category', () => {
        Category.validate = jest.fn();
       let category = new Category({
            name: 'Movie'
        }, null);
        expect(Category.validate).toHaveBeenCalled()
        expect( category.props.created_at).toBeInstanceOf(Date);

        category = new Category({
            name: "Movie",
            description: "some description",
            is_active: false
        }, null)
        let created_at = new Date();
        expect(category.props).toStrictEqual({
            name: 'Movie',
            description: "some description",
            is_active: false,
            created_at,
        });


        category = new Category({
            name: "Movie",
            description: "other description",
        }, undefined)
        expect(category.props).toMatchObject({
            name: 'Movie',
            description: "other description"
        });

        category = new Category({
            name: "Movie",
            is_active: true
        })
        expect(category.props).toMatchObject({
            name: 'Movie',
            is_active: true
        });

        created_at = new Date();
        category = new Category({
            name: "Movie",
            created_at
        })
        expect(category.props).toMatchObject({
            name: 'Movie',
            created_at
        });
    })

    test('getter of name field', () => {
        const category = new Category({ name: 'Movie'});
        expect(category.name).toBe("Movie");
    })


    test('getter of description field', () => {
        let category = new Category({
            name: "Movie"});
            expect(category.description).toBeNull();

        category = new Category({
                name: "Movie",
            description: 'some description'});
        expect(category.description).toBe("some description");

        category = new Category({
            name: "Movie",
        });
        category["description"] = "other description";
        expect(category.description).toBe("other description");

        category["description"] = undefined;
        expect(category.description).toBeNull();
    })

    test("getter and setter of is_active prop", ()=>{
        let category = new Category({
            name: "Movie",
        });
        expect(category.is_active).toBeTruthy();

        category = new Category({
            name: "Movie",
            is_active: true
        });
        expect(category.is_active).toBeTruthy();
        category = new Category({
            name: "Movie",
            is_active: false
        });
        expect(category.is_active).toBeFalsy();
    });

    test("getter of created_at prop", () => {
        let category = new Category({
            name: "Movie"
        })
        expect(category.created_at).toBeInstanceOf(Date);
       
        let created_at = new Date();
        category = new Category({
            name: "Movie",
            created_at
        }); 
        expect(category.created_at).toBe(created_at);
    })

    test("id field", () =>{
        type CategoryData = { props: CategoryProperties; id?: UniqueEntityId};
        const data:CategoryData[] = [
            {props: {name: 'Movie'}},
            {props: {name: 'Movie'}, id: null},
            {props: {name: 'Movie'}, id: undefined},
            {props: {name: 'Movie'}, id: new UniqueEntityId()},
        ];

        data.forEach((i) => {
            const category = new Category(i.props, i.id);
            expect(category.id).not.toBeNull();
            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        });
    })

    it( "should update category", () => {
        const category = new Category({ name: "Movie"});
        category.update("Sport", "some description");
        expect(Category.validate).toHaveBeenCalledTimes(2);

        expect(category.name).toBe("Sport");
        expect(category.description).toBe("some description")
    });

    it("should active a category", () =>{
        const category = new Category({
            name: "Movies",
            is_active: false,
        });
        category.activated()
        expect(category.is_active).toBeTruthy();
    })

})


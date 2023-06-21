import UniqueEntityId  from '../../../@seedwork/domain/vo/unique-entity-id.vo';
import Entity from '../../../@seedwork/domain/entity/entity';
import ValidatorRules from '../../../@seedwork/validators/validator-rule';
import CategoryValidatorFactory from '../validators/category.validator';

export type CategoryProperties = {
    name : string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}
export class Category extends Entity<CategoryProperties>{    
    constructor(public readonly props: CategoryProperties, id?: UniqueEntityId){
        super(props, id);
        Category.validate(props);
        this.description       = this.props.description;
        this.is_active         = this.props.is_active ?? true;
        this.props.created_at  = this.props.created_at ?? new Date();
    }
    
    get name(){
        return this.props.name;
    }
    private set name(value: string){
        this.props.name = value;
    }

    private set description(value: string){
        this.props.description = value ?? null;
    }
    
    get description()
    {
        return this.props.description;
    }

    private set is_active(value: boolean){
        this.props.is_active = value ?? true; 
    }

    get is_active()
    {
        return this.props.is_active;
    }

    get created_at()
    {
        return this.props.created_at;
    }

    activated() {
        this.props.is_active = true;
    }

    deactivated() {
        this.props.is_active = false;
    }
    update(name: string, description: string):void{
        Category.validate({name, description});
        this.name  = name;
        this.description = description
    }

   //static validate(props: Omit<CategoryProperties,'created_at'>){
   //     ValidatorRules.values(props.name, 'name').required().string().maxlength(255);
    //    ValidatorRules.values(props.is_active, 'is_active').boolean();
    //    ValidatorRules.values(props.description, 'description').string();
   // }

   static validate(props: CategoryProperties){
    const validator = CategoryValidatorFactory.create();
    validator.validate(props)
   }
}



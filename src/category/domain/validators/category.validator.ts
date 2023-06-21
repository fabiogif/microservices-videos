import { ClassValidatorFields } from "../../../@seedwork/validators/class-validator-fields";
import { CategoryProperties } from "../entities/category";

export class CategoryRule {
    name: string;
    description: string;
    is_active: string;
    created_at: Date;

    constructor({name, description, is_active, created_at} : CategoryProperties){
        Object.assign(this, {name, description, is_active, created_at});
    }
}

export class CategoryValidator extends ClassValidatorFields <CategoryRule> {
    validate(data: CategoryProperties): boolean {
        return super.validate(new CategoryRule(data));
    }
    
}
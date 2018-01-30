import { Model } from "./model.model";

export class Carer extends Model
{
    first_name: string = null;
    middle_name: string = null;
    surname: string = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);
    }
}

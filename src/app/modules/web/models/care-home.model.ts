import { Model } from "../../../models/model.model";

export class CareHome extends Model
{
    name: string = null;
    care_service_name: string = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);
    }
}

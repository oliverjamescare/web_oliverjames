import { Model } from "../../../../models/model.model";

export class JobCost extends Model
{
    total_cost: number = 0;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "_id"});
    }
}

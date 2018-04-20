import { Model } from "../../../models/model.model";
import { User } from './user.model';
import { JobCost } from './job-cost.model';

export class Job extends Model
{
    id: string = null;
    start_date: number = null;
    end_date: number = null;
    status: string = null;
    carer?: User = null;
    cost?: JobCost = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "_id"});

        //sub objects
        object["carer"]? this.carer = new User(object["carer"]) : null;
        object["cost"]? this.cost = new JobCost(object["cost"]) : null;
    }
}

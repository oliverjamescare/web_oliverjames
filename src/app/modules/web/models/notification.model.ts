import { Model } from "../../../models/model.model";
import { User } from './user.model';
import { JobCost } from './job-sub-models/job-cost.model';

export class Notification extends Model
{
    id: string = null;
    title: string = null;
    description: string = null;
    job_id: string = null;
    created: number = null;
    status: string = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "_id", "job_id": "job"});
    }
}

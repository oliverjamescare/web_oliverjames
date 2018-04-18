import { Model } from "../../../models/model.model";
import { User } from './user.model';

export class Job extends Model
{
    id: string = null;
    start_date: number = null;
    end_date: number = null;
    status: string = null;
    carer?: User = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "_id"});

        //sub objects
        object["carer"]? this.carer = new User(object["carer"]) : null;
    }
}

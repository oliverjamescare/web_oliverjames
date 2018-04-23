import { Model } from "../../../../models/model.model";

export class JobSummarySheet extends Model
{
    voluntary_deduction: number = 0;
    end_date: number = null;
    start_date: number = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);
    }
}

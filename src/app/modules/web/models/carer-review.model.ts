import { Model } from "../../../models/model.model";

export class CarerReview extends Model
{
    count: number = 0;
    average: number = 0;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);
    }
}

import { Model } from "../../../../models/model.model";

export class CarerPaymentSystem extends Model
{
    bank_number: string = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);
    }
}

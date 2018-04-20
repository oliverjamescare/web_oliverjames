import { Model } from "../../../../models/model.model";

export class AddressDetail extends Model
{
    id: string = null;
    Line1: string = null;
    Line2: string = null;
    City: string = null;
    Company: string = null;
    PostalCode: string = null;


    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "Id", });
    }
}

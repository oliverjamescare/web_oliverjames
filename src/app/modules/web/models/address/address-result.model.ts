import { Model } from "../../../../models/model.model";

export class AddressResult extends Model
{
    id: string = null;
    Type: string = null;
    Text: string = null;
    Highlight: string = null;
    Description: string = null;


    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "Id", });
    }
}

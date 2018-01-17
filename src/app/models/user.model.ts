import { Model } from "./model.model";

export class User extends Model
{
    id: string = null;
    email: string = null;
    password: string = null;
    phoneNumber: string = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "_id", "phoneNumber": "phone_number" });
    }
}

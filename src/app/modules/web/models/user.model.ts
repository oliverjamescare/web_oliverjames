import { Model } from "../../../models/model.model";
import { Token } from './token.model';
import { Carer } from './carer.model';
import { CareHome } from './care-home.model';

export class User extends Model
{
    id: string = null;
    email: string = null;
    access_token?: Token = null;
    carer?: Carer = null;
    care_home?: CareHome = null;
    status?: string = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "_id", "phoneNumber": "phone_number" });

        //sub objects
        object["carer"]? this.carer = new Carer(object["carer"]) : null;
        object["access_token"]? this.access_token = new Token(object["access_token"]) : null;
        object["care_home"]? this.care_home = new CareHome(object["care_home"]) : null;
    }
}

import { Model } from "../../../models/model.model";
import { Token } from './user-sub-models/token.model';
import { Carer } from './user-sub-models/carer.model';
import { CareHome } from './user-sub-models/care-home.model';
import { Address } from './user-sub-models/address.model';

export class User extends Model
{
    id: string = null;
    email: string = null;
    email_verified: boolean = null;
    phone_number: string = null;
    address?: Address = null;
    access_token?: Token = null;
    carer?: Carer = null;
    care_home?: CareHome = null;
    status?: string = null;
    distance?: number = 0;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "_id", "phoneNumber": "phone_number" });

        //sub objects
        object["carer"]? this.carer = new Carer(object["carer"]) : null;
        object["access_token"]? this.access_token = new Token(object["access_token"]) : null;
        object["care_home"]? this.care_home = new CareHome(object["care_home"]) : null;
        object["address"]? this.address = new Address(object["address"]) : null;
    }
}

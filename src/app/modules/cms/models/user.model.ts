import { Model } from '../../../models/model.model';
import { CareHome } from './care-home.model';
import { Address } from './address.model';

export class User extends Model
{
    id: string = null;
    email: string = null;
    email_verified: boolean = null;
    phone_number: string = null;
    status: string = null;
    notes: string = null;
    banned_until: number = null;
    activation_date: number = null;

    //sub objects
    care_home?: CareHome = null;
    address?: Address = null;

    constructor(object: Object = {}) {
        super();
        this.assignProperties(this, object, {'id': '_id'});

        //sub objects
        object["care_home"]? this.care_home = new CareHome(object["care_home"]) : null;
        object["address"]? this.address = new Address(object["address"]) : null;
    }
}

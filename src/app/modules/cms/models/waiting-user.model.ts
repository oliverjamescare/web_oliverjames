import { Model } from '../../../models/model.model';
import { Address } from './address.model';

export class WaitingUser extends Model
{
    id: string = null;
    email: string = null;
    name: string = null;
    banned_until: number = null;
    created: number = null;

    //sub objects
    address?: Address = null;

    constructor(object: Object = {}) {
        super();
        this.assignProperties(this, object, {'id': '_id'});

        //sub objects
        object["address"]? this.address = new Address(object["address"]) : null;
    }
}

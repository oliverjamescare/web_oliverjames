import { Model } from '../../../models/model.model';
import {Tokens} from './tokens.model';
import {CareHome} from './care-home.model';

export class Admin extends Model {
    id: string = null;
    email: string = null;
    access_token: Tokens = null;
    role: string = null;
    first_name: string = null;
    surname: string = null;

    constructor(object: Object = {}) {
        super();
        this.assignProperties(this, object, {'id': '_id', });

        object["access_token"]? this.access_token = new Tokens(object["access_token"]) : null;
    }
}

import {Model} from '../../../models/model.model';

export class User extends Model {
    id: string = null;
    email: string = null;
    token: string = null;
    first_name: string = null;
    surname: string = null;

    constructor(object: Object = {}) {
        super();
        this.assignProperties(this, object, {'id': '_id'});
    }
}

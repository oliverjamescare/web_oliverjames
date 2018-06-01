import { Model } from '../../../models/model.model';

export class Admin extends Model {
    id: string = null;
    email: string = null;
    access_token: any = null;
    role: string = null;
    first_name: string = null;
    surname: string = null;

    constructor(object: Object = {}) {
        super();
        this.assignProperties(this, object, {'id': '_id', });
    }
}

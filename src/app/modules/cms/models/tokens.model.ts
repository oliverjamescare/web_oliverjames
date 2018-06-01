import { Model } from '../../../models/model.model';

export class Tokens extends Model {
    token: string = null;
    refresh_token: string = null;

    constructor(object: Object = {}) {
        super();
        this.assignProperties(this, object);
    }
}

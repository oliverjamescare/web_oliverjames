import { Model } from '../../../models/model.model';
import { CareHome } from '../../web/models/care-home.model';

export class Credit extends Model
{
    amount: number = null;
    description: string = null;
    created: Date = null;
    status: string = null;
    balance: number = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);
    }
}

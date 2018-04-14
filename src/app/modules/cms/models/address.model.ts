import { Model } from '../../../models/model.model';
import { CareHome } from '../../web/models/care-home.model';

export class Address extends Model
{
    postal_code: string = null;
    city: string = null;
    address_line_1: boolean = null;
    address_line_2: boolean = null;
    location: Object = null;
    company: string = null;
    link: string = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);
    }

    stringify() : string
    {
        return (this.company ? this.company + ", " : "") + this.address_line_1 + ", " + (this.address_line_2 ? this.address_line_2 + ", " : "") + this.postal_code + ", " + this.city
    }
}

import { Model } from "../../../../models/model.model";
import { CarerReview } from './carer-review.model';
import { CarerPaymentSystem } from './carer-payment-system.model';

export class Carer extends Model
{
    first_name: string = null;
    middle_name: string = null;
    surname: string = null;
    gender: string = null;
    profile_image: string = null;
    max_job_distance: number = null;
    eligible_roles: Array<string> = [];
    reviews?: CarerReview = null;
    payment_system?: CarerPaymentSystem = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);

        //sub objects
        object["reviews"]? this.reviews = new CarerReview(object["reviews"]) : null;
        object["payment_system"]? this.payment_system = new CarerPaymentSystem(object["payment_system"]) : null;
        Array.isArray(object["eligible_roles"])? object["eligible_roles"].forEach(role => this.eligible_roles.push(role)) : []
    }

    getCarerFullName() : string
    {
        return this.first_name + " " + this.surname;
    }
}

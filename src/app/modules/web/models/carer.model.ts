import { Model } from "../../../models/model.model";
import { CarerReview } from './carer-review.model';

export class Carer extends Model
{
    first_name: string = null;
    middle_name: string = null;
    surname: string = null;
    reviews: CarerReview = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);

        //sub objects
        object["reviews"]? this.reviews = new CarerReview(object["reviews"]) : null;
    }

    getCarerFullName() : string
    {
        return this.first_name + " " + this.surname;
    }
}

import { Model } from '../../../models/model.model';
import { GeneralGuidance } from './general-guidance.model';
import { Credit } from './credit.model';

export class CareHome extends Model
{
    care_service_name: string = null;
    type_of_home: string = null;
    name: string = null;
    gender_preference: string = null;
    credits_balance: number = 0;
    general_guidance: GeneralGuidance = null;
    blocked_carers?: Array<Object> = [];
    credits: Array<Credit> = [];

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);

        //sub objects
        object["general_guidance"]? this.general_guidance = new GeneralGuidance(object["general_guidance"]) : null;
        Array.isArray(object["blocked_carers"])?  this.blocked_carers = object["blocked_carers"] : [];
        Array.isArray(object["credits"])?  this.credits = object["credits"].map(credit => new Credit(credit)) : [];
    }
}

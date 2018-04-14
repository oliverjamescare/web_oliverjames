import { Model } from '../../../models/model.model';
import { CareHome } from '../../web/models/care-home.model';

export class GeneralGuidance extends Model
{
    floor_plan: string | File = null;
    parking: string = null;
    notes_for_carers: string = null;
    emergency_guidance: string = null;
    report_contact: string = null;
    superior_contact: string = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);
    }
}

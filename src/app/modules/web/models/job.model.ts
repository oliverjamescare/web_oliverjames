import { Model } from "../../../models/model.model";
import { User } from './user.model';
import { JobCost } from './job-sub-models/job-cost.model';
import { JobSummarySheet } from './job-sub-models/job-summary-sheet.model';
import { JobPayment } from './job-sub-models/job-payment.model';
import { JobGeneralGuidance } from './job-sub-models/job-general-guidance.model';

export class Job extends Model
{
    id: string = null;
    start_date: number = null;
    end_date: number = null;
    status: string = null;
    role: string = null;
    notes: string = null;
    author?: User = null;
    carer?: User = null;
    cost?: JobCost = null;
    projected_income?: number = 0;
    conflict?: boolean = null;
    summary_sheet?: JobSummarySheet = null;
    payment?: JobPayment = null;
    general_guidance?: JobGeneralGuidance = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object, {"id": "_id"});

        //sub objects
        object["carer"]? this.carer = new User(object["carer"]) : null;
        object["author"]? this.author = new User(object["author"]) : null;
        object["cost"]? this.cost = new JobCost(object["cost"]) : null;
        object["summary_sheet"]? this.summary_sheet = new JobSummarySheet(object["summary_sheet"]) : null;
        object["payment"]? this.payment = new JobPayment(object["payment"]) : null;
        object["general_guidance"]? this.general_guidance = new JobGeneralGuidance(object["general_guidance"]) : null;
    }

    getTimeBilled(applyDeductions = true) : string
    {
        const start = this.summary_sheet && this.summary_sheet.start_date ? this.summary_sheet.start_date : this.start_date;
        const end = this.summary_sheet && this.summary_sheet.end_date ? this.summary_sheet.end_date : this.end_date;
        const deductions = this.summary_sheet && this.summary_sheet.voluntary_deduction ? this.summary_sheet.voluntary_deduction : 0;

        let durationMinutes = Math.floor((end - start) / (1000 * 60));
        if(applyDeductions)
            durationMinutes -= deductions;

        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;

        return (hours > 0 ? hours == 1 ? hours + " hour " : hours + " hours " : "") + (hours > 0 && minutes > 0 ? " " : "") +  (minutes > 0 ? minutes == 1 ? minutes + " minute " : minutes + " minutes " : "")
    }

    getDueIn() : string
    {
        const now = new Date();
        const diff = this.start_date - now.getTime();
        const hourDiff = Math.floor(diff / 3600000);

        return hourDiff > 24 ? `${Math.ceil(hourDiff / 24)} day(s)` : hourDiff < 1 ? 'Less than hour' : `${hourDiff} hours`;
    }
}

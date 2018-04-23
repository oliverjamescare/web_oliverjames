import { Model } from "../../../../models/model.model";

export class JobPayment extends Model
{
    transaction_charge: number = 0;
    application_fee: number = 0;
    deductions: number = 0;
    job_income: number = 0;
    net_income: number = 0;
    status: string = null;
    payment_date: number = null;
    debit_date: number = null;

    constructor(object: Object = {})
    {
        super();
        this.assignProperties(this, object);
    }
}

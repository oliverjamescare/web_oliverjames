import {BookingForm} from './booking-form';

export class PreBookedJob {
    _id: number;
    start_date: number;
    end_date: number;
    amount: number;
    role: string; // Carer or Senior Carer
    notes?: string;
    carersToContact?: number;
    priority_carers?: any[];

    static getInstanceFromResponse(job: PreBookedJob): PreBookedJob {
        const preBookedJob = new PreBookedJob();
        preBookedJob._id = job._id;
        preBookedJob.start_date = job.start_date;
        preBookedJob.end_date = job.end_date;
        preBookedJob.amount = job.amount;
        preBookedJob.role = job.role;
        preBookedJob.carersToContact = job.carersToContact;
        preBookedJob.priority_carers = job.priority_carers;
        preBookedJob.notes = job.notes;
        return preBookedJob;
    }

    static getInstanceFromForm(bookingForm: BookingForm, index: number): PreBookedJob
    {
        const preBookedJob = new PreBookedJob();
        preBookedJob._id = index;
        preBookedJob.start_date = bookingForm.from;
        preBookedJob.end_date = bookingForm.till;
        preBookedJob.amount = bookingForm.number;
        preBookedJob.role = bookingForm.role;

        return preBookedJob;
    }

    getStartDate(): Date {
        return new Date(this.start_date);
    }

    getEndDate(): Date {
        return new Date(this.end_date);
    }

}

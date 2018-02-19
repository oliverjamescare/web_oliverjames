import {BookingForm} from './booking-form';

export class PreBookedJob {
    start_date: number;
    end_date: number;
    amount: number;
    role: string; // Carer or Senior Carer

    constructor(bookingForm: BookingForm) {
        console.log('constructor booking form', bookingForm);
        this.start_date = new Date(bookingForm.from).getTime();
        this.end_date = new Date(bookingForm.till).getTime();
        this.amount = bookingForm.number;
        this.role = bookingForm.role;
    }
}

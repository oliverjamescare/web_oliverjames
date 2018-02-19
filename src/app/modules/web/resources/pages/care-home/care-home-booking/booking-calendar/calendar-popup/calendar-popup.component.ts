import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';

const TIMESTAMP_INTERVAL = 900000; // 15 min in milliseconds
const NUMBER_OF_INTERVALS = 50; // number of 15 min intervals in select list

@Component({
    selector: 'app-calendar-popup',
    templateUrl: './calendar-popup.component.html',
    styleUrls: ['./calendar-popup.component.scss']
})
export class CalendarPopupComponent implements OnInit {
    @Input() direction: string;
    @Input() date: Date;
    @Output() closePopup = new EventEmitter();
    form: FormGroup;
    timeFromArr: Date[] = [];
    timeTillArr: Date[] = [];
    errorMessage: string = null;

    constructor(public bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.setHoursIntervals();
        this.createForm();
    }

    onClosePopup(): void {
        this.closePopup.emit();
    }

    onAddBooking(): void {
        console.log('Add form', this.form.value);
        !this.form.valid ? this.errorMessage = 'One or many fields are incomplete' : this.bookingService.bookJob(this.form.value);
    }

    private createForm(): void {
        this.form = new FormGroup({
            'start_date': new FormControl(this.getBookingCalendarIndex(), Validators.required),
            'from': new FormControl(null, Validators.required),
            'till': new FormControl(null, Validators.required),
            'role': new FormControl(null, Validators.required),
            'number': new FormControl(1, [Validators.min(1), Validators.max(5)])
        });
    }

    private getStartTime(): Date {
        const date = new Date();
        date.setHours(7, 0, 0, 0);
        return date;
    }

    private setHoursIntervals(): void {
        this.timeFromArr.push(this.getStartTime());
        for (let i = 1; i < NUMBER_OF_INTERVALS; i++) {
            if (i > 1) {
                this.timeTillArr.push(new Date(this.timeFromArr[i - 1].getTime()));
            }
            if (i < 49) {
                this.timeFromArr.push(new Date(this.timeFromArr[i - 1].getTime() + TIMESTAMP_INTERVAL));
            }
        }
        this.timeFromArr.splice(this.timeFromArr.length - 1, 1);
    }

    private getBookingCalendarIndex(): number {
        for (let i = 0; i < this.bookingService.calendar.length; i++) {
            if (this.date.getMonth() === this.bookingService.calendar[i].day.getMonth() &&
                this.date.getDate() === this.bookingService.calendar[i].day.getDate()) {
                return i;
            }
        }
        return -1;
    }

}

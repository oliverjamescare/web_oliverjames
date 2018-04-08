import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';
import * as dateformat from 'dateformat';

const TIMESTAMP_INTERVAL = 900000; // 15 min in milliseconds
const MIN_IN_MILLISECONDS = 60000;
const NUMBER_OF_INTERVALS = 98; // number of 15 min intervals in select list hour from 7:00, 19:00

@Component({
    selector: 'app-calendar-popup',
    templateUrl: './calendar-popup.component.html',
    styleUrls: ['./calendar-popup.component.scss']
})
export class CalendarPopupComponent implements OnInit {
    @Input() direction: string;
    @Input() date: Date;
    @Input() index: number;
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
        if (!this.form.valid) {
            this.errorMessage = 'One or many fields are incomplete';
        } else if (!this.isValidFromTill(this.form.get('from').value, this.form.get('till').value)) {
            this.errorMessage = 'Please check the start and end times';
        } else if (!this.validDate(+this.form.controls['from'].value)) {
            this.errorMessage = `The earliest a job can start is ${dateformat(this.timeTillArr[this.findActualFromIndex()], 'shortTime')}`;
        } else {
            this.addJobsToList();
            this.closePopup.emit();
        }
    }

    private addJobsToList(): void {
        for (let i = 0; i < this.form.get('number').value; i++) {
            this.bookingService.bookJob({
                start_date: this.form.get('start_date').value,
                from: this.timeFromArr[this.form.get('from').value].getTime(),
                till: this.timeTillArr[this.form.get('till').value].getTime(),
                role: this.form.get('role').value,
                number: 1
            }, +this.form.get('start_date').value);
        }
    }

    private createForm(): void {
        this.form = new FormGroup({
            'start_date': new FormControl(this.getBookingCalendarIndex(), Validators.required),
            'from': new FormControl(28, Validators.required),
            'till': new FormControl(29, Validators.required),
            'role': new FormControl(null, Validators.required),
            'number': new FormControl(1, [Validators.min(1), Validators.max(5)])
        });
    }

    private getStartTime(): Date {
        const date = this.date;
        date.setHours(0, 0, 0, 0);
        return date;
    }

    private setHoursIntervals(): void {
        this.timeFromArr.push(this.getStartTime());
        for (let i = 1; i < NUMBER_OF_INTERVALS; i++) {
            if (i > 1) {
                if (i === NUMBER_OF_INTERVALS - 1) {
                    this.timeTillArr.push(new Date(this.timeFromArr[i - 1].getTime() - MIN_IN_MILLISECONDS));
                } else {
                    this.timeTillArr.push(new Date(this.timeFromArr[i - 1].getTime()));
                }
            }
            if (i < NUMBER_OF_INTERVALS - 1) {
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

    private isValidFromTill(start: number, end: number): boolean {
        return (end - start) >= 0;
    }

    private validDate(startDate: number): boolean {
        const index = this.findActualFromIndex();
        console.log('index', index);
        return startDate > index;
    }

    private findActualFromIndex(): number {
        const now = new Date();
        console.log('now', now);
        let findedIndex = -1;
        this.timeFromArr.forEach((date, index) => {
            if (now.getTime() > date.getTime()) {
                console.log('Available from', this.timeFromArr[index]);
                findedIndex = index;
            }
        });
        return findedIndex;
    }

}

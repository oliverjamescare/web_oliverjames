import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {PreBookedJob} from '../../../../../../../models/care-home-booking/pre-booked-job';
import {CareHomeBookingService} from '../../../../../../../services/care-home-booking.service';
import {CalendarPopupService} from '../../../../../care-home/care-home-booking/booking-calendar/calendar-popup/calendar-popup.service';
import {Subscription} from 'rxjs/Subscription';
import {isUndefined} from "util";

@Component({
    selector: 'app-carer-calendar-day',
    templateUrl: './carer-calendar-day.component.html',
    styleUrls: ['./carer-calendar-day.component.scss']
})
export class CarerCalendarDayComponent implements OnInit, OnChanges, OnDestroy {
    @Input() dayNumber: number;
    @Input() date: Date;
    @Input() empty: boolean;
    @Input() jobs: any[] = [];
    @Input() direction: string;
    @Input() index: number;

    validDay: boolean;
    allJobs: { start: Date, end: Date, preBooked: boolean }[] = [];
    preBookedJobs: PreBookedJob[] = [];

    bookedJobSub: Subscription;

    constructor(private calendarPopupService: CalendarPopupService,
                private bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.validateDay();
        this.getBookedJob();
    }

    ngOnChanges() {
        this.setUpList();
    }

    ngOnDestroy() {
        this.bookedJobSub.unsubscribe();
    }

    isAddPopupOpen(): boolean {
        return this.calendarPopupService.openAddPopup === this.index;
    }

    isListPopupOpen(): boolean {
        return this.calendarPopupService.openListPopup === this.index;
    }

    onOpenPopup(): void {
        if (this.allJobs.length !== 0) {
            this.calendarPopupService.openAddPopup = null;
            this.calendarPopupService.openListPopup = this.index;
        } else {
            this.calendarPopupService.openAddPopup = this.index;
            this.calendarPopupService.openListPopup = null;
        }
    }

    onClosePopup(): void {
        this.calendarPopupService.openAddPopup = null;
    }

    getDay(empty: boolean, day: Date): number {
        return (empty === true || isUndefined(day)) ? null : day.getDate();
    }

    private validateDay(): boolean {
        const today = new Date();
        if (isUndefined(this.date)) {
            return false;
        }
        this.validDay = today.getTime() > this.date.getTime();
    }

    private getBookedJob(): void {
        this.bookedJobSub = this.bookingService.addedBooking.subscribe(
            (bookedJob: PreBookedJob) => {
                if (bookedJob._id === this.index) {
                    this.preBookedJobs.push(bookedJob);
                    this.setUpList();
                }
            }
        );
    }

    private setUpList(): void {
        this.allJobs = [];
        if (!isUndefined(this.jobs)) {
            this.jobs.forEach((job) => {
                this.allJobs.push({
                    start: new Date(job.start_date),
                    end: new Date(job.end_date),
                    preBooked: false
                });
            });
            this.preBookedJobs.forEach((job) => {
                this.allJobs.push({
                    start: job.getStartDate(),
                    end: job.getEndDate(),
                    preBooked: true
                });
            });
        }
    }

}

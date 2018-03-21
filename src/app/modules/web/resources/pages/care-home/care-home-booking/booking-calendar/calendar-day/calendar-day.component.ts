import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CalendarPopupService} from '../calendar-popup/calendar-popup.service';
import {isUndefined} from 'util';
import {PreBookedJob} from '../../../../../../models/care-home-booking/pre-booked-job';
import {Subscription} from 'rxjs/Subscription';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';

@Component({
    selector: 'app-calendar-day',
    templateUrl: './calendar-day.component.html'
})
export class CalendarDayComponent implements OnInit, OnChanges, OnDestroy {
    @Input() dayNumber: number;
    @Input() date: Date;
    @Input() empty: boolean;
    @Input() jobs: any[] = [];
    @Input() direction: string;
    @Input() index: number;

    pastDay: boolean;
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

    validateDay(): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isUndefined(this.date)) {
            return false;
        }
        return this.pastDay = today.getTime() > this.date.getTime();
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

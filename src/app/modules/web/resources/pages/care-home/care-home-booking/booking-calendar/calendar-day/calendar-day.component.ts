import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {CalendarPopupService} from '../calendar-popup/calendar-popup.service';
import {isUndefined} from 'util';
import {PreBookedJob} from '../../../../../../models/care-home-booking/pre-booked-job';
import {Subscription} from 'rxjs/Subscription';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';
import * as moment from 'moment';

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
    allJobs: { index: number | null, start: Date, end: Date, preBooked: boolean, role: string}[] = [];
    preBookedJobs: PreBookedJob[] = [];

    bookedJobSub: Subscription;
    removedJob: Subscription;

    constructor(private calendarPopupService: CalendarPopupService,
                private bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.validateDay();
        this.getBookedJob();
        this.registerRemovedJobAction();
    }

    ngOnChanges() {
        this.setUpList();
    }

    ngOnDestroy() {
        this.bookedJobSub.unsubscribe();
        this.removedJob.unsubscribe();
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

                if (moment(bookedJob._id).format("YYYY-MM-DD") == moment(this.date).format("YYYY-MM-DD"))
                {
                    this.preBookedJobs.push(bookedJob);
                    this.setUpList();
                }
            }
        );
    }

    private registerRemovedJobAction(): void
    {
        this.removedJob = this.bookingService.removedBooking.subscribe(
            (bookedJob: PreBookedJob) => {

                if (moment(bookedJob._id).format("YYYY-MM-DD") == moment(this.date).format("YYYY-MM-DD"))
                {
                    const index = this.preBookedJobs.findIndex(job => job._id == bookedJob._id);
                    if(index != -1)
                    {
                        this.preBookedJobs.splice(index, 1);
                        this.setUpList();
                    }
                }
            }
        );
    }

    private setUpList(): void
    {
        this.allJobs = [];
        const foundPreBookedIndexes = [];

        if (!isUndefined(this.jobs))
        {
            this.jobs.forEach((job) => {
                this.allJobs.push({
                    index: null,
                    start: new Date(job.start_date),
                    end: new Date(job.end_date),
                    role: job.role,
                    preBooked: false
                });
            });

            this.preBookedJobs.forEach((job) => {

                const index = this.bookingService.preBookedJobs.findIndex((preBookedJob, i) => preBookedJob._id == job._id && !foundPreBookedIndexes.includes(i));
                if(index != -1)
                    foundPreBookedIndexes.push(index);

                this.allJobs.push({
                    index: index,
                    start: job.getStartDate(),
                    end: job.getEndDate(),
                    role: job.role,
                    preBooked: true
                });
            });
        }
    }

}

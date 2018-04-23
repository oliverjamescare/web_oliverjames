import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {PreBookedJob} from '../../../../../../../models/care-home-booking/pre-booked-job';
import {CareHomeBookingService} from '../../../../../../../services/care-home-booking.service';
import {CalendarPopupService} from '../../../../../care-home/care-home-booking/booking-calendar/calendar-popup/calendar-popup.service';
import {Subscription} from 'rxjs/Subscription';
import {isUndefined} from 'util';
import {Job} from '../../../../../../../models/job.model';
import {CarerJobService} from '../../../../../../../services/carer-job.service';

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
    allJobs: { job: Job, type: string }[] = [];
    consideredJob: Job;

    consideredJobSub: Subscription;

    constructor(private calendarPopupService: CalendarPopupService,
                private carerJobService: CarerJobService) {
    }

    ngOnInit() {
        this.validateDay();
    }

    ngOnChanges() {
        this.getConsideredJob();
        this.setUpList();
    }

    ngOnDestroy() {
        if (this.consideredJobSub) {
            this.consideredJobSub.unsubscribe();
        }
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

    getDay(empty: boolean, day: Date): number {
        return (empty === true || isUndefined(day)) ? null : day.getDate();
    }

    private getConsideredJob(): void {
        this.carerJobService.consideredJob.subscribe(
            (job: Job) => {
                console.log("considered")
                this.consideredJob = job;
                this.setUpList();
            }
        );
    }

    private validateDay(): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isUndefined(this.date)) {
            return false;
        }
        this.validDay = today.getTime() > this.date.getTime();
    }

    private setUpList(): void {
        this.allJobs = [];
        if (!isUndefined(this.jobs)) {
            this.jobs.forEach((job) => {
                this.allJobs.push({
                    job: new Job(job),
                    type: 'normal'
                });
            });
        }

    }

}

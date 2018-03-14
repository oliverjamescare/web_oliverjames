import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarerJobService} from '../../../../services/carer-job.service';
import {Subscription} from 'rxjs/Subscription';
import {DatesService} from '../../../../services/dates.service';
import {Availability} from '../../../../models/carer-availability/carer-availability';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-carer-availability',
    templateUrl: './carer-availability.component.html',
    styleUrls: ['./carer-availability.component.scss']
})
export class CarerAvailabilityComponent implements OnInit, OnDestroy {
    availability: Availability;
    weeks: Date[];
    currentWeek = 0;
    weekDaysArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    buttonLoading = false;

    getCalendarSub: Subscription;

    constructor(public carerService: CarerJobService,
                private dateService: DatesService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.setWeeksArr();
        this.getCalendar();
    }

    ngOnDestroy() {
        this.getCalendarSub.unsubscribe();
    }

    onWeekChange(event: any): void {
        this.currentWeek = +event.target.value;
        this.getCalendar();
    }

    onSingleClick(day: string, shift: string): void {
        this.availability.availability[day][shift] = !this.availability.availability[day][shift];
    }

    onAllClick(day: string): void {
        this.availability.availability[day].am_shift = !this.availability.availability[day].am_shift;
        this.availability.availability[day].pm_shift = !this.availability.availability[day].pm_shift;
        this.availability.availability[day].night_shift = !this.availability.availability[day].night_shift;
    }

    onToggleClick(shift: string): void {
        this.weekDaysArray.forEach((day) => {
            this.availability.availability[day][shift] = !this.availability.availability[day][shift];
        });
    }

    onAvailabilitySave(): void {
        this.buttonLoading = true;
        this.carerService.updateAvailabilityCalendar(this.currentWeek, this.availability)
            .subscribe(
                (response: Availability) => {
                    this.buttonLoading = false;
                    this.getCalendar();
                    this.notificationService.success('Success', 'Calendar updated');
                    console.log('updateAvailabilityCalendar success response', response);
                },
                error => {
                    this.buttonLoading = false;
                    console.log('updateAvailabilityCalendar error response', error);
                    this.notificationService.error('Error', 'Calendar update failed');
                }
            );
    }

    private getCalendar(): void {
        this.getCalendarSub = this.carerService.getAvailabilityCalendar(this.currentWeek)
            .subscribe(
                (response: Availability) => {
                    console.log('Get availability calendar success response', response);
                    this.availability = response;
                    this.carerService.availability = response;
                },
                error => {
                    this.notificationService.warn('Unable to load data from api, try again');
                    console.log('Get availability calendar error response', error);
                }
            );
    }

    private setWeeksArr(): void {
        this.weeks = this.dateService.getStartWeeksDates();
    }

}

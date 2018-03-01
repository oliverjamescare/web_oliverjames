import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarerService} from '../../../../services/carer.service';
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
    loading: boolean;
    all = true;
    toggle = true;

    getCalendarSub: Subscription;

    constructor(public carerService: CarerService,
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
        this.availability.availability[day].am_shift = this.all;
        this.availability.availability[day].pm_shift = this.all;
        this.availability.availability[day].night_shift = this.all;
        this.all = !this.all;
    }

    onToggleClick(shift: string): void {
        this.weekDaysArray.forEach((day) => {
            this.availability.availability[day][shift] = this.toggle;
        });
        this.toggle = !this.toggle;
    }

    onAvailabilitySave(): void {
        this.carerService.updateAvailabilityCalendar(this.currentWeek, this.availability)
            .subscribe(
                (response: Availability) => {
                    this.getCalendar();
                    this.notificationService.success('Success', 'Calendar updated');
                    console.log('updateAvailabilityCalendar success response', response);
                },
                error => {
                    console.log('updateAvailabilityCalendar error response', error);
                    this.notificationService.error('Error', 'Calendar update failed');
                }
            );
    }

    private getCalendar(): void {
        this.loading = true;
        this.getCalendarSub = this.carerService.getAvailabilityCalendar(this.currentWeek)
            .subscribe(
                (response: Availability) => {
                    this.loading = false;
                    console.log('Get availability calendar success response', response);
                    this.availability = response;
                    this.carerService.availability = response;
                },
                error => {
                    this.loading = false;
                    console.log('Get availability calendar error response', error);
                }
            );
    }

    private setWeeksArr(): void {
        this.weeks = this.dateService.getStartWeeksDates();
    }

}

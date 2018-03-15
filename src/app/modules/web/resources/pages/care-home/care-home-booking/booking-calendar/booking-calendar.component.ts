import {Component, Input, OnInit} from '@angular/core';
import {CareHomeBookingService} from '../../../../../services/care-home-booking.service';
import {CalendarCell} from './calendar-cell';
import {CalendarDay} from '../../../../../models/care-home-booking/calendar-day';
import {CalendarPopupService} from './calendar-popup/calendar-popup.service';

@Component({
    selector: 'app-booking-calendar',
    templateUrl: './booking-calendar.component.html'
})
export class BookingCalendarComponent implements OnInit {
    calendar: CalendarDay[];
    calendarArr: CalendarCell[] = [];
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    @Input() bookingServiceStr: string;

    constructor(public bookingService: CareHomeBookingService,
                public popupService: CalendarPopupService) {
    }

    ngOnInit() {
        this.getApiData();
    }

    private getApiData(): void {
        this.bookingService.getCalendar()
            .subscribe(
                (response: CalendarDay[]) => {
                    this.bookingService.calendar = response;
                    console.log('Get calendar response', response);
                    this.setCalendar();
                    this.emitPreBookedJobs();
                }
            );
    }

    private setCalendar(): void {
        this.addLabel(this.monthNames[this[this.bookingServiceStr].calendar[0].day.getMonth()], false);
        let count = 0;
        this.bookingService.calendar.forEach((day, index) => {
                count++;
                if (day.day.getDate() === this.daysInMonth(day.day.getMonth() + 1, day.day.getFullYear())) {
                    for (let j = 0; j < 8; j++) {
                        count++;
                        j === 0 ? this.addDay(day.day, day.jobs, this.getDirection(count), index) : this.addEmptyDay();
                        if ((index + 1 + j) % 7 === 0) {
                            this.addLabel(this.monthNames[day.day.getMonth() + 1], false);
                            count--;
                        }
                    }
                } else {
                    this.addDay(day.day, day.jobs, this.getDirection(count), index);
                }
            }
        );
    }

    private addLabel(month: string, showInstruction: boolean): void {
        this.calendarArr.push({
            templateType: 'label',
            month: month,
            showInstruction: showInstruction
        });
    }

    private addEmptyDay(): void {
        this.calendarArr.push({
            templateType: 'day',
            dayData: {
                isEmpty: true
            }
        });
    }

    private addDay(day: Date, jobs: any[], direction: string, index: number): void {
        this.calendarArr.push({
            templateType: 'day',
            dayData: {
                date: day,
                index: index,
                direction: direction,
                jobs: jobs
            }
        });
    }

    private getDirection(index: number): string {
        return index % 7 === 0 ? 'left' : 'right';
    }

    private daysInMonth(month, year): number {
        return new Date(year, month, 0).getDate();
    }

    private emitPreBookedJobs(): void {
        setTimeout(() => {
            this.bookingService.emitPreBookedJobs();
        }, 200);
    }

}

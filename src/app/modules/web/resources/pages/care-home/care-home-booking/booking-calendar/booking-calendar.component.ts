import {Component, OnInit} from '@angular/core';
import {CareHomeBookingService} from '../../../../../services/care-home-booking.service';
import {CalendarCell} from './calendar-cell';
import {CalendarDay} from '../../../../../models/care-home-booking/calendar-day';

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

    constructor(public bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.getApiData();
    }

    private getApiData(): void {
        this.bookingService.getCalendar()
            .subscribe(
                (response: CalendarDay[]) => {
                    this.calendar = response;
                    this.setCalendar();
                }
            );
    }

    private setCalendar(): void {
        this.addLabel(this.monthNames[this.calendar[0].day.getMonth()], true);
        let count = 0;
        this.calendar.forEach((day, index) => {
                count++;
                if (day.day.getDate() === this.daysInMonth(day.day.getMonth() + 1, day.day.getFullYear())) {
                    for (let j = 0; j < 8; j++) {
                        count++;
                        j === 0 ? this.addDay(day.day.getDate(), day.jobs, this.getDirection(count)) : this.addEmptyDay();
                        if ((index + 1 + j) % 7 === 0) {
                            this.addLabel(this.monthNames[this.calendar[0].day.getMonth() + 1], false);
                            count --;
                        }
                    }
                } else {
                    this.addDay(day.day.getDate(), day.jobs, this.getDirection(count));
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
                day: 0
            }
        });
    }

    private addDay(day: number, jobs: any[], direction: string): void {
        this.calendarArr.push({
            templateType: 'day',
            dayData: {
                day: day,
                jobs: jobs,
                direction: direction
            }
        });
    }

    private getDirection(index: number): string {
        return index % 7 === 0 ? 'left' : 'right';
    }

    private daysInMonth(month, year): number {
        return new Date(year, month, 0).getDate();
    }

}

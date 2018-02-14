import {Component, OnInit} from '@angular/core';
import {CareHomeBookingService} from '../../../../../services/care-home-booking.service';
import {CalendarDay} from '../../../../../models/calendar-day';

@Component({
    selector: 'app-booking-calendar',
    templateUrl: './booking-calendar.component.html'
})
export class BookingCalendarComponent implements OnInit {
    arrayLength = 43; // 42 days + one label;
    daysArray = [];

    constructor(public bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.bookingService.getData()
            .subscribe(
                response => {
                    this.bookingService.calendar = [];
                    response.calendar.forEach((day) => {
                        this.bookingService.calendar.push(new CalendarDay(day));
                    });
                    console.log('Calendar', this.bookingService.calendar);
                    this.setArray();
                }
            );
    }

    private setArray(): void {
        this.bookingService.calendar.forEach((day, index) => {
                console.log(day.day.getDate());
                if (day.day.getDate() === this.daysInMonth(day.day.getMonth() + 1, day.day.getFullYear())) {
                    for (let j = 0; j < 8; j++) {
                        j === 0 ? this.daysArray.push(day.day.getDate()) : this.daysArray.push(0);
                        if ((index + 1 + j) % 7 === 0) {
                            this.daysArray.push(-1);
                        }
                    }
                } else {
                    this.daysArray.push(day.day.getDate());
                }
            }
        );
    }

    private daysInMonth(month, year): number {
        return new Date(year, month, 0).getDate();
    }

}

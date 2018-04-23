import { Component, OnInit } from '@angular/core';
import { CarerJobService } from '../../../../../services/carer-job.service';
import { CalendarCell } from '../../../care-home/care-home-booking/booking-calendar/calendar-cell';

@Component({
    selector: 'app-carer-calendar',
    templateUrl: './carer-calendar.component.html',
    styleUrls: ['./carer-calendar.component.scss']
})
export class CarerCalendarComponent implements OnInit
{
    calendarArr: CalendarCell[] = [];
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    constructor(private carerJobService: CarerJobService) {}

    ngOnInit()
    {
        this.getCalendarData();
    }

    private getCalendarData(): void
    {
        this.carerJobService.getCarerCalendar()
            .subscribe(
                response =>
                {
                    this.carerJobService.calendar = response;
                    this.setCalendar();
                });
    }

    private setCalendar(): void
    {
        this.addLabel(this.monthNames[this.carerJobService.calendar[0].day.getMonth()], false);
        let count = 0;
        this.carerJobService.calendar.forEach((day, index) =>
            {
                count++;
                if (day.day.getDate() === this.daysInMonth(day.day.getMonth() + 1, day.day.getFullYear()))
                {
                    for (let j = 0; j < 8; j++)
                    {
                        count++;
                        j === 0 ? this.addDay(day.day, day.jobs, this.getDirection(count), index) : this.addEmptyDay();
                        if ((index + 1 + j) % 7 === 0)
                        {
                            this.addLabel(this.monthNames[day.day.getMonth() + 1], false);
                            count--;
                        }
                    }
                } else
                {
                    this.addDay(day.day, day.jobs, this.getDirection(count), index);
                }
            }
        );
    }

    private addLabel(month: string, showInstruction: boolean): void
    {
        this.calendarArr.push({
            templateType: 'label',
            month: month,
            showInstruction: showInstruction
        });
    }

    private addEmptyDay(): void
    {
        this.calendarArr.push({
            templateType: 'day',
            dayData: {
                isEmpty: true
            }
        });
    }

    private addDay(day: Date, jobs: any[], direction: string, index: number): void
    {
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

    private getDirection(index: number): string
    {
        return index % 7 === 0 ? 'left' : 'right';
    }

    private daysInMonth(month, year): number
    {
        return new Date(year, month, 0).getDate();
    }

}

import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-calendar-day',
    templateUrl: './calendar-day.component.html'
})
export class CalendarDayComponent implements OnInit {
    @Input() day: number;
    @Input() jobs: any[];

    constructor() {
    }

    ngOnInit() {
    }

    getDay(day: number): number {
        return day === 0 ? null : day;
    }

}

import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-calendar-day',
    templateUrl: './calendar-day.component.html'
})
export class CalendarDayComponent implements OnInit, OnChanges {
    @Input() dayData: number;
    labelCell = false;
    dayNumber: number;

    constructor() {
    }

    ngOnChanges() {
        this.setDayView();
    }

    ngOnInit() {
    }

    private setDayView(): void {
        if (this.dayData === -1) {
            this.labelCell = true;
        } else {
            this.dayNumber = this.dayData !== 0 ? this.dayData : null;
            console.log()
        }
    }

}

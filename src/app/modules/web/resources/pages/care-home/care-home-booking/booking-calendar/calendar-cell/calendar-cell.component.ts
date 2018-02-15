import {Component, Input, OnInit} from '@angular/core';
import {CalendarCell} from '../calendar-cell';

@Component({
    selector: 'app-calendar-cell',
    templateUrl: './calendar-cell.component.html',
    styleUrls: ['./calendar-cell.component.scss']
})
export class CalendarCellComponent implements OnInit {
    @Input() cellData: CalendarCell;

    constructor() {
    }

    ngOnInit() {
    }

}

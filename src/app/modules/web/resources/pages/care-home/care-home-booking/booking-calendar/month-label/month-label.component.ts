import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-month-label',
    templateUrl: './month-label.component.html'
})
export class MonthLabelComponent implements OnInit {
    @Input() month: string;
    @Input() showInstruction = false;
    constructor() {
    }

    ngOnInit() {
    }

}

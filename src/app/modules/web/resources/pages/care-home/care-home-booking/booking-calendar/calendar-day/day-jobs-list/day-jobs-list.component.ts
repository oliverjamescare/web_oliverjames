import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../../../../../models/care-home-booking/job';

@Component({
    selector: 'app-day-jobs-list',
    templateUrl: './day-jobs-list.component.html',
    styleUrls: ['./day-jobs-list.component.scss']
})
export class DayJobsListComponent implements OnInit {
    @Input() jobs: Job[];
    @Input() index: number;
    @Input() allJobs: { start: Date, end: Date, preBooked: boolean }[] = [];

    constructor() {
    }

    ngOnInit() {
    }

}

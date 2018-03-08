import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../../../../../../models/care-home-booking/job';

@Component({
    selector: 'app-carer-job-list',
    templateUrl: './carer-job-list.component.html',
    styleUrls: ['./carer-job-list.component.scss']
})
export class CarerJobListComponent implements OnInit {
    @Input() jobs: Job[];
    @Input() index: number;
    @Input() allJobs: { job: Job, type: string }[] = [];

    showPopup: boolean[] = [];

    constructor() {
    }

    ngOnInit() {
        this.setUpdPopupList();
    }

    onMouseEnter(index: number): void {
        this.showPopup[index] = true;
    }

    onMouseLeave(index: number): void {
        this.showPopup[index] = false;
    }

    private setUpdPopupList(): void {
        this.allJobs.forEach((job) => {
            this.showPopup.push(false);
        });
    }


}

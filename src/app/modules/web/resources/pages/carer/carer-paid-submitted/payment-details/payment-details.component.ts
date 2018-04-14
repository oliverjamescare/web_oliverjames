import {Component, OnInit} from '@angular/core';
import {CarerJobService} from '../../../../../services/carer-job.service';
import {isUndefined} from 'util';
import {Router} from '@angular/router';

const HOUR_IN_MILLISECONDS = 3600000;
const MINUTE_IN_MILLISECONDS = 60000;

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

    constructor(public carerJobService: CarerJobService,
                private router: Router) {
    }

    ngOnInit() {
        if (isUndefined(this.carerJobService.pastJobDetails)) {
            this.router.navigate(['/carer-paid-submitted']);
        }
    }

    getTotalTimeWorked(): string {
        let start = 1523700000000;
        let end = 1523709000000;
        if (!isUndefined(this.carerJobService.pastJobDetails.summary_sheet.start_date)) {
            start = this.carerJobService.pastJobDetails.summary_sheet.start_date;
        } else {
            start = this.carerJobService.pastJobDetails.start_date;
        }

        if (!isUndefined(this.carerJobService.pastJobDetails.summary_sheet.end_date)) {
            end = this.carerJobService.pastJobDetails.summary_sheet.end_date;
        } else {
            end = this.carerJobService.pastJobDetails.end_date;
        }
        const minutes = Math.ceil((end - start) / MINUTE_IN_MILLISECONDS);
        return `${Math.floor(minutes / 60)} hour(s) ${minutes % 60} minute(s)`;
    }

    getTotalTimeBilled(): string {
        let start = 1523700000000;
        let end = 1523709000000;
        if (!isUndefined(this.carerJobService.pastJobDetails.summary_sheet.start_date)) {
            start = this.carerJobService.pastJobDetails.summary_sheet.start_date;
        } else {
            start = this.carerJobService.pastJobDetails.start_date;
        }

        if (!isUndefined(this.carerJobService.pastJobDetails.summary_sheet.end_date)) {
            end = this.carerJobService.pastJobDetails.summary_sheet.end_date;
        } else {
            end = this.carerJobService.pastJobDetails.end_date;
        }
        const minutes =
            Math.ceil((end - start - this.carerJobService.pastJobDetails.summary_sheet.voluntary_deduction) / MINUTE_IN_MILLISECONDS);
        return `${Math.floor(minutes / 60)} hour(s) ${minutes % 60} minute(s)`;
    }

}

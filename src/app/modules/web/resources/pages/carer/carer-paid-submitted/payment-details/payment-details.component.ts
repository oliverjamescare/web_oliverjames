import {Component, OnInit} from '@angular/core';
import {CarerJobService} from '../../../../../services/carer-job.service';
import {isUndefined} from 'util';
import {Router} from '@angular/router';
import { Job } from '../../../../../models/job.model';

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit
{
    job: Job;
    constructor(private carerJobService: CarerJobService, private router: Router) {}

    ngOnInit() : void
    {
        if (isUndefined(this.carerJobService.pastJobDetails))
            this.router.navigate(['/carer-paid-submitted']);

        this.job = this.carerJobService.pastJobDetails;
    }
}

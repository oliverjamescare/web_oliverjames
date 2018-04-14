import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CarerJobService} from '../../../../services/carer-job.service';
import {Router} from '@angular/router';

const MONTH_IN_MILLISECONDS = 2592000000;

@Component({
    selector: 'app-carer-paid-submitted',
    templateUrl: './carer-paid-submitted.component.html',
    styleUrls: ['./carer-paid-submitted.component.scss']
})
export class CarerPaidSubmittedComponent implements OnInit {
    form: FormGroup;
    page = 1;

    submittedJobs: any[] = [];

    constructor(private carerJobService: CarerJobService,
                private router: Router) {
    }

    ngOnInit() {
        this.createForm();
        this.setDatepickers();
        this.getSubmttedJobs();
    }

    private getSubmttedJobs(): void {
        this.carerJobService.getSubmittedJobs(
            new Date(this.form.get('from').value).getTime(),
            new Date(this.form.get('to').value).getTime(),
            this.page
        )
            .subscribe(
                response => {
                    console.log('Get submitted jobs success response', response);
                    this.submittedJobs = response.results;
                },
                error => {
                    console.log('Get submitted jobs error response', error);
                }
            );
    }

    private createForm(): void {
        this.form = new FormGroup({
            from: new FormControl(moment(this.getInitialFromDate()).format('YYYY-MM-DD')),
            to: new FormControl(moment(this.getInitialToDate()).format('YYYY-MM-DD'))
        });
    }

    private setDatepickers(): void {
        $('#from').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(this.getInitialFromDate()).format('YYYY-MM-DD'),
            hide: (event: Event) => {
                this.form.get('from').setValue(event.target['value']);
                this.getSubmttedJobs();
            }
        });

        $('#to').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(this.getInitialToDate()).format('YYYY-MM-DD'),
            hide: (event: Event) => {
                this.form.get('to').setValue(event.target['value']);
                this.getSubmttedJobs();
            }
        });
    }

    navigateToDetails(job: any): void {
        this.carerJobService.pastJobDetails = job;
        this.router.navigate(['/carer-paid-submitted-details']);
    }


    private getInitialFromDate(): Date {
        const startTimestamp = new Date().getTime() - MONTH_IN_MILLISECONDS;
        return new Date(startTimestamp);
    }

    private getInitialToDate(): Date {
        const endTimestamp = this.getInitialFromDate().getTime() + MONTH_IN_MILLISECONDS;
        return new Date(endTimestamp);
    }

}

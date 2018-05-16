import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CarerJobService} from '../../../../services/carer-job.service';
import {Router} from '@angular/router';
import { Job } from '../../../../models/job.model';

const MONTH_IN_MILLISECONDS = 2592000000;

@Component({
    selector: 'app-carer-paid-submitted',
    templateUrl: './carer-paid-submitted.component.html',
    styleUrls: ['./carer-paid-submitted.component.scss']
})
export class CarerPaidSubmittedComponent implements OnInit
{
    form: FormGroup;
    page: number = 1;
    pages: number = 0;
    jobs: Array<Job> = [];

    constructor(private carerJobService: CarerJobService, private router: Router) {}

    ngOnInit()
    {
        this.createForm();
        this.setDatepickers();
        this.getSubmittedJobs();
    }

    onPageChange(page: number): void
    {
        this.page = page;
        this.getSubmittedJobs();
    }

    private getSubmittedJobs(): void
    {
        this.carerJobService.getSubmittedJobs(
                new Date(this.form.get('from').value).getTime(),
                new Date(this.form.get('to').value).getTime(),
                this.page
            ).subscribe((results: { jobs: Array<Job>, pages: number }) => {
                this.jobs = results.jobs;
                this.pages = results.pages;
            });
    }

    private createForm(): void
    {
        this.form = new FormGroup({
            from: new FormControl(moment(this.getInitialFromDate()).format('YYYY-MM-DD')),
            to: new FormControl(moment(this.getInitialToDate()).format('YYYY-MM-DD'))
        });
    }

    private setDatepickers(): void
    {
        $('#from').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(this.getInitialFromDate()).format('YYYY-MM-DD'),
            change: (event: Event) => {
                this.form.get('from').setValue(event.target['value']);

                // const start = new Date(this.form.get('from').value);
                // const to = new Date(this.form.get('to').value);
                // if(to.getTime() < start.getTime())
                // {
                //     $('#to').datepicker({ value: this.form.get('from').value, minDate: start})
                // }

                this.getSubmittedJobs();
            }
        });

        $('#to').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(this.getInitialToDate()).format('YYYY-MM-DD'),
            minDate: moment(this.getInitialFromDate()).format('YYYY-MM-DD'),
            change: (event: Event) => {
                this.form.get('to').setValue(event.target['value']);
                this.getSubmittedJobs();
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
        const endTimestamp = new Date().getTime() + MONTH_IN_MILLISECONDS;
        return new Date(endTimestamp);
    }

    private setPaginationArray(length: number): number[] {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    }

}

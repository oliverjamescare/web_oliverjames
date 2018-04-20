import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../services/care-home.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { Job } from '../../../../models/job.model';

const MONTH_IN_MILLISECONDS = 2592000000;

@Component({
    selector: 'app-care-home-past-jobs',
    templateUrl: './care-home-past-jobs.component.html',
    styleUrls: ['./care-home-past-jobs.component.scss']
})
export class CareHomePastJobsComponent implements OnInit
{
    page: number = 1;
    pages: number = 0;
    form: FormGroup;
    jobs: Array<Job> = [];

    constructor(private careHomeService: CareHomeService, private router: Router) {}

    ngOnInit()
    {
        this.createForm();
        this.setDatepickers();
        this.getPastJobs();
    }

    onPageChange(page: number): void
    {
        this.page = page;
        this.getPastJobs();
    }

    navigateToChallenge(job: any): void
    {
        this.careHomeService.pastJobDetails = job;
        this.router.navigate(['/care-home-past-challenge-job/']);
    }

    private getPastJobs(): void
    {
        this.careHomeService.getCareHomePastJobs(
                new Date(this.form.get('from').value).getTime(),
                new Date(this.form.get('to').value).getTime(),
                this.page
            ).subscribe((results: { jobs: Array<Job>, pages: number }) => {
                console.log(results);
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
            hide: (event: Event) => {
                this.form.get('from').setValue(event.target['value']);
                this.getPastJobs();
            }
        });

        $('#to').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(this.getInitialToDate()).format('YYYY-MM-DD'),
            hide: (event: Event) => {
                this.form.get('to').setValue(event.target['value']);
                this.getPastJobs();
            }
        });
    }

    private getInitialFromDate(): Date
    {
        const startTimestamp = new Date().getTime() - MONTH_IN_MILLISECONDS;
        return new Date(startTimestamp);
    }

    private getInitialToDate(): Date
    {
        const endTimestamp = new Date().getTime() + MONTH_IN_MILLISECONDS;
        return new Date(endTimestamp);
    }
}

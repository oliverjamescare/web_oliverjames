import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../services/care-home.service';
import {FormControl, FormGroup} from '@angular/forms';

const MONTH_IN_MILLISECONDS = 2592000000;

@Component({
    selector: 'app-care-home-past-jobs',
    templateUrl: './care-home-past-jobs.component.html',
    styleUrls: ['./care-home-past-jobs.component.scss']
})
export class CareHomePastJobsComponent implements OnInit {
    page = 1;
    form: FormGroup;
    pastJobs: any[] = [];
    pages: number[] = [];

    constructor(private careHomeService: CareHomeService) {
    }

    ngOnInit() {
        this.createForm();
        this.setDatepickers();
        this.getPastJobs();
    }

    onPaginationChange(page: number): void {
        this.page = page;
        this.getPastJobs();
    }

    private getPastJobs(): void {
        this.careHomeService.getCareHomePastJobs(
            new Date(this.form.get('from').value).getTime(),
            new Date(this.form.get('to').value).getTime(),
            this.page
        )
            .subscribe(
                response => {
                    console.log('Get submitted jobs success response', response);
                    this.pastJobs = response.results;
                    this.pages = this.setPaginationArray(response.pages);
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

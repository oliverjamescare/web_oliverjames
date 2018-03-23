import {Component, OnInit} from '@angular/core';
import {JobsService} from '../../../../services/jobs.service';
import {JobListObject} from '../../../../models/response/job-list-object';
import {JobListResponse} from '../../../../models/response/job-list-response';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {
    jobs: JobListObject[] = [];

    search = '';
    jobStatus: string;
    reviewStatus: string;
    manualBooking: string;
    page = 1;
    pages: number[] = [];
    form: FormGroup;

    constructor(private jobsService: JobsService) {
    }

    ngOnInit() {
        this.createForm();
        this.onSearch();
        this.getJobs();
    }

    onPageChange(page: number): void {
        this.page = page;
        this.getJobs();
    }

    onFilter(filterName: string, filterValue: string): void {
        this[filterName] = filterValue;
        this.getJobs();
    }

    onSearch(): void {
        this.form.get('search').valueChanges
            .debounceTime(400)
            .subscribe(data => {
                this.search = data;
                this.getJobs();
            });
    }

    private getJobs(): void {
        this.jobsService.getJobsList(this.search, this.jobStatus, this.reviewStatus, this.manualBooking, this.page)
            .subscribe(
                (response: JobListResponse) => {
                    console.log('Get jobs success response', response);
                    this.jobs = response.results;
                    this.pages = this.setPaginationArray(response.pages);
                },
                error => console.log('Get jobs error response', error)
            );
    }

    private setPaginationArray(length: number): number[] {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    }

    private createForm(): void {
        this.form = new FormGroup({
            'status': new FormControl('ALL'),
            'review': new FormControl('ALL'),
            'manual_booking': new FormControl('ALL'),
            'search': new FormControl('')
        });
    }

}

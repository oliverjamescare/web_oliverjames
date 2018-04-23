import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../../../../models/job.model';
import { CarerJobService } from '../../../../../services/carer-job.service';

@Component({
    selector: 'app-carer-available-jobs-list',
    templateUrl: './carer-available-jobs-list.component.html',
    styleUrls: ['./carer-available-jobs-list.component.scss']
})
export class CarerAvailableJobsListComponent implements OnInit
{
    page: number = 1;
    pages: number = 0;
    jobs: Array<Job> = [];
    sort: string = "startASC";
    distance: number | boolean = false;

    @Input() title: string;
    @Input() meet_criteria: boolean;

    constructor(private carerService: CarerJobService) {}

    ngOnInit(): void
    {
        this.getJobs();
    }

    onChangeSort(sort: string): void
    {
        this.sort = sort;
        this.getJobs();
    }

    onPageChange(page: number): void
    {
        this.page = page;
        this.getJobs();
    }


    private getJobs(): void
    {
        this.carerService.getAvailableJobs(this.page, this.sort, this.distance, this.meet_criteria)
            .subscribe((results: { jobs: Array<Job>, pages: number }) => {
                this.jobs = results.jobs;
                this.pages = results.pages;
            });
    }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarerJobService} from '../../../../services/carer-job.service';
import {AvailableJobsResponse} from '../../../../models/available-jobs/available-jobs-response';
import {Subscription} from 'rxjs/Subscription';
import {Job} from '../../../../models/care-home-booking/job';

@Component({
    selector: 'app-carer-available-jobs',
    templateUrl: './carer-available-jobs.component.html',
    styleUrls: ['./carer-available-jobs.component.scss']
})
export class CarerAvailableJobsComponent implements OnInit, OnDestroy {
    availableJobs: Job[] = [];
    showDistanceFilters = false;
    showStartFilters = false;
    showEndFilter = false;
    showRoleFilters = false;

    getParams = {
        page: 1,
        results: null,
        dont_meet_criteria: 1,
        distance: null,
        sort: null
    };

    loading = true;
    getJobsSub: Subscription;

    constructor(public carerService: CarerJobService) {
    }

    ngOnInit() {
        this.getAvailableJobs();
    }

    ngOnDestroy() {
        this.getJobsSub.unsubscribe();
    }

    onShowFilters(): void {
        this.showDistanceFilters = !this.showDistanceFilters;
    }

    onShowStartFilters(): void {
        this.showStartFilters = !this.showStartFilters;
    }

    onSelectFilter(filter: string): void {
        this.getParams.sort = filter;
        this.getAvailableJobs();
    }

    onSelectDistanceFilter(distance: number): void {
        this.getParams.distance = distance;
        this.showDistanceFilters = false;
        this.getAvailableJobs();
    }

    private getAvailableJobs(): void {
        this.loading = true;
        this.getJobsSub = this.carerService.getAvailableJobs(this.getParams)
            .subscribe(
                (response: any) => {
                    this.loading = false;
                    console.log('getAvailableJobs success response', response);
                    this.availableJobs = response.jobs;
                },
                error => {
                    console.log('getAvailableJobs error response', error);
                    this.loading = false;
                }
            );
    }

}

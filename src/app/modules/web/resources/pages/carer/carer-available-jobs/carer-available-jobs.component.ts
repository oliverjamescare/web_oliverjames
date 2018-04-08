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
    showStartSorters = false;
    showEndSorters = false;
    showIncomeSorters = false;
    showRoleSorters = false;

    availableJobsWithoutCriteria: Job[] = [];
    showDistanceFiltersWithout = false;
    showStartSortersWithout = false;
    showEndSortersWithout = false;
    showIncomeSortersWithout = false;
    showRoleSortersWithout = false;

    getParams = {
        page: 1,
        results: null,
        dont_meet_criteria: 0,
        distance: null,
        sort: null
    };

    pages: number[] = [];

    getParamsWithoutCriteria = {
        page: 1,
        results: null,
        dont_meet_criteria: 1,
        distance: null,
        sort: null
    };

    pagesWithoutCriteria: number[] = [];

    loading = false;
    getJobsSub: Subscription;

    constructor(public carerService: CarerJobService) {
    }

    ngOnInit() {
        this.getAvailableJobs();
        this.getAvailableJobsWithoutCriteria();
    }

    ngOnDestroy() {
        this.getJobsSub.unsubscribe();
    }

    onPaginationWithoutChange(page: number): void {
        this.getParamsWithoutCriteria.page = page;
        this.getAvailableJobsWithoutCriteria();
    }
    onPaginationChange(page: number): void {
        this.getParams.page = page;
        this.getAvailableJobs();
    }

    onShowFilters(): void {
        this.showDistanceFilters = !this.showDistanceFilters;
    }

    onSelectDistanceFilter(distance: number): void {
        this.getParams.distance = distance;
        this.showDistanceFilters = false;
        this.getAvailableJobs();
    }

    onShowFiltersWithout(): void {
        this.showDistanceFilters = !this.showDistanceFilters;
    }

    onSelectDistanceFilterWithout(distance: number): void {
        this.getParamsWithoutCriteria.distance = distance;
        this.showDistanceFilters = false;
        this.getAvailableJobsWithoutCriteria();
    }

    onShowSorters(sorterName: string): void {
        this[sorterName] = !this[sorterName];
    }

    onSelectSorter(sortString: string, sorter: string): void {
        this.getParams.sort = sortString;
        this[sorter] = false;
        this.getAvailableJobs();
    }

    onShowSortersWithout(sorterName: string): void {
        this[sorterName] = !this[sorterName];
    }

    onSelectSorterWithout(sortString: string, sorter: string): void {
        this.getParamsWithoutCriteria.sort = sortString;
        this[sorter] = false;
        this.getAvailableJobsWithoutCriteria();
    }

    private getAvailableJobs(): void {
        this.getJobsSub = this.carerService.getAvailableJobs(this.getParams)
            .subscribe(
                (response: any) => {
                    console.log('getAvailableJobs success response', response);
                    this.availableJobs = response.jobs;
                    this.pages = this.setPaginationArray(response.pages);
                },
                error => {
                    console.log('getAvailableJobs error response', error);
                }
            );
    }

    private getAvailableJobsWithoutCriteria(): void {
        this.getJobsSub = this.carerService.getAvailableJobs(this.getParamsWithoutCriteria)
            .subscribe(
                (response: any) => {
                    console.log('getAvailableJobsWithout criteria success response', response);
                    this.availableJobsWithoutCriteria = response.jobs;
                    this.pagesWithoutCriteria = this.setPaginationArray(response.pages);
                },
                error => {
                    console.log('getAvailableJobs error response', error);
                }
            );
    }

    private setPaginationArray(length: number): number[] {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    }

}

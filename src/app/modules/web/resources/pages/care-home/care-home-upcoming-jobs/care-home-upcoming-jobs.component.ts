import {Component, Input, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../services/care-home.service';
import {isUndefined} from 'util';

@Component({
    selector: 'app-care-home-upcoming-jobs',
    templateUrl: './care-home-upcoming-jobs.component.html',
    styleUrls: ['./care-home-upcoming-jobs.component.scss']
})
export class CareHomeUpcomingJobsComponent implements OnInit {
    @Input() showPagination = false;
    results = 10;
    page = 1;
    upcomingJobs: any[] = [];

    pages: number[] = [];

    constructor(private careHomeService: CareHomeService) {
    }

    ngOnInit() {
        this.getUpcomingJobs();
    }

    getCarerOutput(index: number): string {
        if (!isUndefined(this.upcomingJobs[index].carer)) {
            return `${this.upcomingJobs[index].carer.carer.first_name} ${this.upcomingJobs[index].carer.carer.surname}`;
        } else if (this.upcomingJobs[index].status !== 'CANCELLED') {
            return 'Pending';
        } else {
            return '';
        }
    }

    onPageChange(page: number): void {
        this.page = page;
        this.getUpcomingJobs();
    }

    private getUpcomingJobs(): void {
        this.careHomeService.getJobs(this.page)
            .subscribe(
                response => {
                    console.log('get upcoming jobs success response', response);
                    this.upcomingJobs = [];
                    response.results.forEach((job) => {
                        if (job.status !== 'CANCELLED') {
                            this.upcomingJobs.push(job);
                        }
                    });
                    this.pages = this.setPaginationArray(response.pages);
                },
                error => {
                    console.log('Get upciming jobs error response');
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

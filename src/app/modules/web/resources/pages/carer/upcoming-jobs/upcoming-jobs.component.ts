import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CarerJobService} from '../../../../services/carer-job.service';
import {Subscription} from 'rxjs/Subscription';
import {Job} from '../../../../models/care-home-booking/job';
import {DatesService} from '../../../../services/dates.service';

@Component({
    selector: 'app-upcoming-jobs',
    templateUrl: './upcoming-jobs.component.html',
    styleUrls: ['./upcoming-jobs.component.scss']
})
export class UpcomingJobsComponent implements OnInit, OnDestroy {
    page = 1;
    upcomingJobs: Job[] = [];
    @Output() jobsDue = new EventEmitter<number>();

    getJobsSub: Subscription;

    constructor(public carerService: CarerJobService,
                private dateService: DatesService) {
    }

    ngOnInit() {
        this.getUpcomingJobs();
    }

    ngOnDestroy() {
        this.getJobsSub.unsubscribe();
    }

    private getUpcomingJobs(): void {
        this.getJobsSub = this.carerService.getUpcomingJobs(this.page)
            .subscribe(
                response => {
                    console.log('Get upcoming jobs success response', response);
                    this.upcomingJobs = this.filterJobs(response);
                    // this.upcomingJobs = response;
                    this.countDueJobs();
                },
                error => console.log('Get upcoming jobs error respone', error)
            );
    }

    private countDueJobs(): void {
        let dueCount = 0;
        this.upcomingJobs.forEach((job) => {
            if (this.dateService.isDueJob(job.getStartDate())) {
                dueCount++;
            }
        });
        this.jobsDue.emit(dueCount);
    }

    private filterJobs(jobs: Job[]): Job[] {
        const arr = [];
        jobs.forEach((job) => {
            if (this.dateService.isUpcomingJob(job.getStartDate())) {
                arr.push(job);
            }
        });
        return arr;
    }

}

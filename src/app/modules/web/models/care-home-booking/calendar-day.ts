import {Job} from './job';
import {PreBookedJob} from './pre-booked-job';

export class CalendarDay {
    day: Date;
    jobs: Job[] = [];
    preBookedJobs: PreBookedJob[] = [];

    constructor(day: string, jobs: Job[]) {
        this.day = new Date(day);
        // this.day = new Date(new Date(day).getTime() - 86400000 * 2);
        this.jobs = jobs;
    }
}

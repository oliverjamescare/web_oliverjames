import {Job} from './job';

export class CalendarDay {
    day: Date;
    jobs: Job[];

    constructor(day: string, jobs: Job[]) {
        this.day = new Date(day);
        this.jobs = jobs;
    }
}

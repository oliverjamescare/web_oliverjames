export class CalendarDay {
    day: Date;
    jobs: any[];

    constructor(day: { day: string, jobs: any[] }) {
        this.day = new Date(day.day);
        this.jobs = day.jobs;
    }
}

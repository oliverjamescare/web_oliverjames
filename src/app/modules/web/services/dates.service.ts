const DAY_IN_MILLISECONDS = 86400000 * 7;
const HOUR_IN_MILLISECONDS = 3600000;
const FIVE_MIN_IN_MILLISECONDS = 300000;

export class DatesService {

    getMonday(d) {
        d = new Date(d);
        const day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    getStartWeeksDates(): Date[] {
        const arr = [this.getMonday(new Date())];
        for (let i = 1; i < 5; i++) {
            arr.push(new Date(arr[i - 1].getTime() + DAY_IN_MILLISECONDS));
        }
        return arr;
    }

    getMondayAsString(): string {
        const monday = this.getMonday(new Date());
        return `${monday.getFullYear()}-${monday.getMonth()}-${monday.getDay()}`;
    }

    getCalendarLastDayAsString(): string {
        const monday = this.getMonday(new Date());
        const lastDay = new Date(monday.getTime() + DAY_IN_MILLISECONDS * 34);
        return `${lastDay.getFullYear()}-${lastDay.getMonth()}-${lastDay.getDay()}`;
    }

    isDueJob(jobStart: Date): boolean {
        const now = new Date();
        return (jobStart.getTime() - now.getTime() < 2 * DAY_IN_MILLISECONDS / 7) && this.isUpcomingJob(jobStart);
    }

    isUpcomingJob(jobStart: Date): boolean {
        const now = new Date();
        return jobStart.getTime() - now.getTime() > FIVE_MIN_IN_MILLISECONDS;
    }
}

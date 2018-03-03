import {Author} from './author';

export class Job {
    _id: string;
    start_date: number;
    end_date: number;
    role: string;
    author: Author;
    conflict?: boolean;

    static getInstance(job: Job): Job {
        const j = new Job();
        Object.assign(j, job);
        return j;
    }

    getStartDate(): Date {
        return new Date(this.start_date);
    }

    getEndDate(): Date {
        return new Date(this.end_date);
    }
}

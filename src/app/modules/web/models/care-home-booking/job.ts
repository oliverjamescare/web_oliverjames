import {Author} from './author';
import {GeneralGuidance} from './general-guidance';

export class Job {
    _id: string;
    start_date: number;
    end_date: number;
    role: string;
    author: Author;
    conflict?: boolean;
    general_guidance: GeneralGuidance;
    notes: string;
    projected_income?: number;
    status: string;

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

import {Job} from '../../../../../models/care-home-booking/job';

export class CalendarCell {
    templateType: string;
    month?: string;
    showInstruction?: boolean;
    dayData?: {
        day: number;
        index?: number;
        jobs?: Job[];
        direction?: string
    };
}

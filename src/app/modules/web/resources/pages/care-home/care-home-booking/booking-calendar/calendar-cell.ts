export class CalendarCell {
    templateType: string;
    month?: string;
    showInstruction?: boolean;
    dayData?: {
        day: number;
        jobs?: any[];
    };
}

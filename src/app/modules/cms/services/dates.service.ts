import * as dateformat from 'dateformat';

export class DatesService {
    getDateString(timestamp: number): string {
        const date = new Date(timestamp);
        return timestamp !== null ? dateformat('yyyy-mm-dd') : null;
    }
}

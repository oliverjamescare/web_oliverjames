const DAY_IN_MILLISECONDS = 86400000 * 7;

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
}

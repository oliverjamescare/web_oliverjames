import {Carer} from '../carer';

export interface CarerListObject {
    _id: string;
    carer: Carer;
    status: string;
    notes: string;
    banned_until: number;
    activation_date: number;
}

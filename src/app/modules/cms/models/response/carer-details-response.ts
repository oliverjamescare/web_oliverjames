import {CarerDetails} from '../carer-details';

export interface CarerDetailsResponse {
    _id: string;
    carer: CarerDetails;
    status: string;
    notes: string;
    banned_until: number;
}
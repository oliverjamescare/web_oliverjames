import {CarerDetails} from '../carer-details';

export interface CarerDetailsResponse {
    _id: string;
    carer: CarerDetails;
    status: string;
    notes: string;
    banned_until: number;
    address: {
        postal_code: string
        company: string
        address_line_1: string
        address_line_2: string
        city: string
    }
}

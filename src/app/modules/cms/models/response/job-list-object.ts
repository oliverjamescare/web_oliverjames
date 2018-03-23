import {Address} from '../../../web/models/care-home-booking/address';

export interface JobListObject {
    _id: string;
    start_date: number;
    end_date: number;
    created: number;
    status: string;
    manual_booking: boolean;
    author: {
        _id: string;
        care_home: {
            care_service_name: string;
            type_of_home: string;
            name: string;
        };
        address: Address;
    };
    carer: {
        _id: string;
        carer: {
            first_name: string;
            surname: string;
        };
    };
    review: {
        status: string
    };
}
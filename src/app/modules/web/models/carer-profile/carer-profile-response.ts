import {Address} from '../care-home-booking/address';
import {CarerProfile} from './carer-profile';

export interface CarerProfileResponse {
    _id: string;
    email: string;
    phone_number: string;
    email_verified: boolean;
    address: Address;
    carer: CarerProfile;
}
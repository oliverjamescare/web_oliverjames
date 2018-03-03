import {PaymentSystem} from './payment';

export interface CarerProfile {
    first_name: string;
    surname: string;
    middle_name: string;
    profile_image?: any;
    max_job_distance: number;
    eligible_roles: string[];
    payment_system: PaymentSystem;
}
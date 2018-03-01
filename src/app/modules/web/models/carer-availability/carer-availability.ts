import {DayAvailability} from './day-availability';

export interface Availability {
    type: string;
    availability: {
        monday: DayAvailability;
        tuesday: DayAvailability;
        wednesday: DayAvailability;
        thursday: DayAvailability;
        friday: DayAvailability;
        saturday: DayAvailability;
        sunday: DayAvailability;
    };

}
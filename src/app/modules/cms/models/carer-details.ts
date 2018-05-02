import {TrainingRecord} from './training-record';
import {JoiningCareExperience} from './joining-care-experience';
import {Dbs} from './dbs';
import {Reference} from './reference';

export interface CarerDetails {
    first_name: string;
    surname: string;
    middle_name: string;
    date_of_birth: string;
    gender: string;
    reference: Reference;
    dbs: Dbs;
    joining_care_experience: JoiningCareExperience;
    training_record: TrainingRecord;
    eligible_roles: string[];
    cv_uploads: string[];
}

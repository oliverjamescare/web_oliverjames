import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/Rx';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class CarerService
{
    public availableSteps = {
        TERMS: 0,
        PERSONAL_DETAILS: 1,
        CV: 2,
        QA: 3
    };
    public registerStep = this.availableSteps.TERMS;
    public personalDetailsFormValues;
    public cv: File;
    public qaFormValues;

    constructor(private apiService: ApiService, private authService: AuthService) {}

    registerCarer()
    {
        if(this.registerStep && this.cv && this.qaFormValues)
        {
            //building form
            let form = new FormData();
            form.append("email",this.personalDetailsFormValues.email);
            form.append("password",this.personalDetailsFormValues.password);
            form.append("phone_number",this.personalDetailsFormValues.phone_number);
            form.append("first_name",this.personalDetailsFormValues.first_name);
            form.append("middle_name",this.personalDetailsFormValues.middle_name);
            form.append("surname",this.personalDetailsFormValues.surname);
            form.append("date_of_birth",this.personalDetailsFormValues.date_of_birth);

            //address
            form.append("postal_code",this.personalDetailsFormValues.postal_code);
            form.append("company",this.personalDetailsFormValues.company);
            form.append("address_line_1",this.personalDetailsFormValues.address_line_1);
            form.append("address_line_2",this.personalDetailsFormValues.address_line_2);
            form.append("city",this.personalDetailsFormValues.city);

            //eligible roles
            let eligibleRoles = [];
            if(this.personalDetailsFormValues.jobRoleCarer)
                eligibleRoles.push("Carer");

            if(this.personalDetailsFormValues.jobRoleSeniorCarer)
                eligibleRoles.push("Senior Carer");

            form.append("eligible_roles",JSON.stringify(eligibleRoles));

            //cv
            form.append("cv", this.cv);

            //q & a
            form.append("criminal_record_value", this.qaFormValues.criminal_record_value);
            form.append("criminal_record_text", this.qaFormValues.criminal_record_text);
            form.append("physical_issues_value", this.qaFormValues.physical_issues_value);
            form.append("engaging_in_moving_value", this.qaFormValues.engaging_in_moving_value);
            form.append("engaging_in_moving_text", this.qaFormValues.engaging_in_moving_text);
            form.append("personal_care_for_resident_value", this.qaFormValues.personal_care_for_resident_value);
            form.append("you_are_late_value", this.qaFormValues.you_are_late_value);
            form.append("find_fallen_resident_value", this.qaFormValues.find_fallen_resident_value);
            form.append("serve_lunch_meals_value", this.qaFormValues.serve_lunch_meals_value);

            //sending form
            return this.apiService.register(form);
        }
    }

    clearRegisterForms()
    {
        this.personalDetailsFormValues = null;
        this.cv = null;
        this.qaFormValues = null;
    }

    loginCarer(email: string, password: string)
    {
        const body = { email, password, "userType": "carer"};
        return this.apiService
            .login(body)
            .map(result => {

                //carer login handle
                const user = new User(result["user"]);
                this.authService.login(user);
                return result;
            });
    }
}

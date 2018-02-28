import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarerAuthService } from '../../../../services/carer-auth.service';

@Component({
    selector: 'app-register-carer-terms',
    templateUrl: './register-carer-terms.component.html',
    styleUrls: [ './register-carer-terms.component.scss' ]
})
export class RegisterCarerTermsComponent
{
    steps: Array<{ name: string, active: boolean, completed: boolean }> = [
        {
            name: "Terms & Conditions",
            active: true,
            completed: false
        },
        {
            name: "Personal details",
            active: false,
            completed: false
        },
        {
            name: "CV upload",
            active: false,
            completed: false
        },
        {
            name: "Q&A",
            active: false,
            completed: false
        }
    ];

    constructor(private router: Router, private carerService: CarerAuthService) {}

    onSubmit(form: NgForm)
    {
        if(form.valid)
        {
            this.carerService.registerStep = this.carerService.availableSteps.PERSONAL_DETAILS;
            this.router.navigate(['/carer/register/personal-details'])
        }
    }
}

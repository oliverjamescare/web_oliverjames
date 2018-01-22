import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

    constructor(private router: Router) {}

    onSubmit(form: NgForm)
    {
        if(form.valid)
            this.router.navigate(['/carer/register/personal-details'])
    }
}

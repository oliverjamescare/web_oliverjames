import { Component, OnInit } from '@angular/core';
import { handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../utilities/form.utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarerService } from '../../../../services/carer.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-carer-q-a',
    templateUrl: './register-carer-q-a.component.html',
    styleUrls: ['./register-carer-q-a.component.scss']
})
export class RegisterCarerQAComponent implements OnInit
{
    steps: Array<{ name: string, active: boolean, completed: boolean }> = [
        {
            name: "Terms & Conditions",
            active: true,
            completed: true
        },
        {
            name: "Personal details",
            active: true,
            completed: true
        },
        {
            name: "CV upload",
            active: true,
            completed: true
        },
        {
            name: "Q&A",
            active: true,
            completed: false
        }
    ];

    inProgress: boolean = false;
    registerError: boolean = false;

    //form config
    form: FormGroup
    formUtils = { handleValidationStateClass, handleValidationErrorMessage }

    messages = [
        {
            field: 'criminal_record_text',
            errors: [
                {
                    error: 'required',
                    message: "Please write explaination"
                }
            ]
        },
        {
            field: 'engaging_in_moving_text',
            errors: [
                {
                    error: 'required',
                    message: "Please write explaination"
                }
            ]
        },
    ];

    constructor(private router: Router, private carerService: CarerService) {}

    ngOnInit()
    {
        //protection against missing steps
        if(this.carerService.registerStep < this.carerService.availableSteps.QA)
            this.router.navigate(["/carer/register/cv"]);

        this.form = new FormGroup({
            criminal_record_value: new FormControl(null, [ Validators.required ]),
            criminal_record_text: new FormControl(""),
            physical_issues_value: new FormControl(null, [ Validators.required ]),
            engaging_in_moving_value: new FormControl(null, [ Validators.required ]),
            engaging_in_moving_text: new FormControl(""),
            personal_care_for_resident_value: new FormControl(null, [ Validators.required ]),
            you_are_late_value: new FormControl(null, [ Validators.required ]),
            find_fallen_resident_value: new FormControl(null, [ Validators.required ]),
            serve_lunch_meals_value: new FormControl(null, [ Validators.required ])
        });

        //dynamic validators
        this.form.get('criminal_record_value').valueChanges.subscribe((value: string) => {
            const control = this.form.get('criminal_record_text');
            control.clearValidators();
            if(value == "0")
                control.setValidators(Validators.required);
            control.updateValueAndValidity();
        });

        this.form.get('engaging_in_moving_value').valueChanges.subscribe((value: string) => {
            const control = this.form.get('engaging_in_moving_text');
            control.clearValidators();
            if(value == "0")
                control.setValidators(Validators.required);
            control.updateValueAndValidity();
        });


    }

    previousStep()
    {
        this.router.navigate(["/carer/register/cv"]);
    }

    onSubmit()
    {
        if(this.form.valid)
        {
            this.carerService.qaFormValues = this.form.value;
            $("#popup").modal();
        }
    }

    onConfirmedSubmit()
    {
        this.inProgress = true;
        this.carerService
            .registerCarer()
            .subscribe(() => {
                $('#popup').modal('hide');
                this.carerService.clearRegisterForms();
                this.router.navigate([ "/carer/register/summary" ]);
            },(error) => this.registerError = true, () => this.inProgress = false);
    }
}

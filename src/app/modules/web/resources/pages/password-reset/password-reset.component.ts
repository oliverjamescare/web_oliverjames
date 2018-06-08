import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { equalToFieldValue, password } from '../../../../../utilities/validators';
import { getMessageError, handleValidationErrorMessage, handleValidationStateClass } from '../../../../../utilities/form.utils';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: [ './password-reset.component.scss' ]
})
export class PasswordResetComponent implements OnInit
{
    //form config
    form: FormGroup
    formUtils = { handleValidationStateClass, handleValidationErrorMessage }
    error: string = "";
    inProgress: boolean = false;
    token: string = "";

    messages = [
        {
            field: 'password',
            errors: [
                {
                    error: 'required',
                    message: "Password is required"
                },
                {
                    error: 'minlength',
                    message: "Password must have 6 characters at least"
                },
                {
                    error: 'password',
                    message: "Password must have at least one letter and number"
                }
            ]
        },
        {
            field: 'password_confirm',
            errors: [
                {
                    error: 'required',
                    message: "Password confirmation is required"
                },
                {
                    error: 'equalToFieldValue',
                    message: "Wrong confirm password field value"
                },
            ]
        }
    ];
    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit()
    {
        this.token = this.route.snapshot.queryParams["token"];

        //form config
        this.form = new FormGroup({
            password: new FormControl(null, [ Validators.required, Validators.minLength(8), password ] ),
            password_confirm: new FormControl(null, [ Validators.required ])
        });

        //password
        this.form.get('password')
            .valueChanges
            .subscribe(
                () => {
                    const control = this.form.get('password_confirm');
                    control.setValidators([Validators.required, equalToFieldValue(this.form.get('password').value)]);
                    control.updateValueAndValidity();
                });

        this.form.get('password_confirm')
            .valueChanges
            .subscribe(() => this.form.get('password_confirm').setValidators([Validators.required, equalToFieldValue(this.form.get('password').value)]));
    }

    onSubmit()
    {
        if(this.form.valid)
        {
            this.inProgress = true;
            this.userService
                .resetPassword(this.token, this.form.get('password').value)
                .subscribe(() => {
                        this.inProgress = false;
                        this.router.navigate(["/"]);
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {getMessageError, handleValidationErrorMessage, handleValidationStateClass} from '../../../../../utilities/form.utils';
import {GeneralService} from '../../../services/general.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    // form config
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    inProgress = false;
    error = '';

    messages = [
        {
            field: 'email',
            errors: [
                {
                    error: 'required',
                    message: 'Email is required'
                },
                {
                    error: 'email',
                    message: 'This is not a valid email address'
                }
            ]
        },
        {
            field: 'name',
            errors: [
                {
                    error: 'required',
                    message: 'Name is required'
                },
                {
                    error: 'maxlength',
                    message: 'Name cannot be longer than 50 characters'
                }
            ]
        },
        {
            field: 'subject',
            errors: [
                {
                    error: 'required',
                    message: 'Subject is required'
                },
                {
                    error: 'maxlength',
                    message: 'Subject cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'message',
            errors: [
                {
                    error: 'required',
                    message: 'Message is required'
                },
                {
                    error: 'maxlength',
                    message: 'Message cannot be longer than 200 characters'
                }
            ]
        }
    ];

    constructor(private generalService: GeneralService) {
    }

    ngOnInit() {
        // form config
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
            subject: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
            message: new FormControl(null, [Validators.required, Validators.maxLength(200)])
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.inProgress = true;
            const formValues = this.form.value;
            this.generalService
                .sendContactMessage(formValues.email, formValues.name, formValues.subject, formValues.message)
                .subscribe(() => {
                        this.inProgress = false;
                        this.form.reset();
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

}

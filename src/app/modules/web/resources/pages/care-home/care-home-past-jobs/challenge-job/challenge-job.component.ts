import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../../services/care-home.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {getMessageError, handleValidationErrorMessage, handleValidationStateClass} from '../../../../../../../utilities/form.utils';
import {Router} from '@angular/router';

@Component({
    selector: 'app-challenge-job',
    templateUrl: './challenge-job.component.html',
    styleUrls: ['./challenge-job.component.scss']
})
export class ChallengeJobComponent implements OnInit {
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    inProgress = false;
    error = '';
    showChallengeConfirmation = false;

    messages = [
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

    constructor(public careHomeService: CareHomeService,
                private router: Router) {
    }

    ngOnInit() {
        if (!this.careHomeService.pastJobDetails) {
            this.router.navigate(['/care-home-past-jobs']);
        }
        // form config
        this.form = new FormGroup({
            message: new FormControl(null, [Validators.required, Validators.maxLength(200)])
        });
    }

    onSubmit() {
        if (this.form.valid) {
            this.inProgress = true;
            const formValues = this.form.value;
            this.careHomeService
                .challengeJobPayment(this.careHomeService.pastJobDetails._id, formValues.message)
                .subscribe(() => {
                        this.inProgress = false;
                        this.form.reset();
                        this.showChallengeConfirmation = true;
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

    onConfirmationClose(): void {
        this.showChallengeConfirmation = false;
        this.router.navigate(['/care-home-past-jobs']);
    }

}

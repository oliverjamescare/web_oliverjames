import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../../../../../services/jobs.service';
import { NotificationsService } from 'angular2-notifications';
import { handleValidationErrorMessage, handleValidationStateClass, getMessageError } from '../../../../../../../utilities/form.utils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-resolve-challenge',
    templateUrl: './resolve-challenge.component.html',
    styleUrls: ['./resolve-challenge.component.scss']
})
export class ResolveChallengeComponent implements OnInit, AfterViewInit
{
    @Input() title: string;
    @Input() type: string;
    @Input() jobId: string;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();

    //form
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    inProgress: boolean = false;
    error: string = '';

    messages = [
        {
            field: 'status',
            errors: [
                {
                    error: 'required',
                    message: 'Status is required'
                }
            ]
        },
        {
            field: 'explanation',
            errors: [
                {
                    error: 'required',
                    message: 'Explanation is required'
                },
                {
                    error: 'maxlength',
                    message: 'Explanation cannot be longer than 1000 characters'
                }
            ]
        }
    ];

    constructor(private jobsService: JobsService, private notificationService: NotificationsService) {}

    ngOnInit()
    {
        //form init
        this.form = new FormGroup({
            'status': new FormControl('UPHELD', Validators.required),
            'explanation': new FormControl(null, [ Validators.required,  Validators.maxLength(1000) ])
        });
    }

    ngAfterViewInit()
    {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onSubmit(): void
    {
        if(this.form.valid)
        {
            this.inProgress = true;
            this.jobsService.resolveChallange(this.jobId, this.form.get('status').value, this.form.get('explanation').value)
                .subscribe(() => {
                        this.notificationService.success('Challange resolved');
                        this.inProgress = false;
                        this.reload.emit();
                        $('#' + this.type + '_id').modal("hide");
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

    private createForm(): void
    {

    }

}

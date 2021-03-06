import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../../services/api.service';
import {NotificationsService} from 'angular2-notifications';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getMessageError, handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../../utilities/form.utils';
import { fileSize, fileType } from '../../../../../../../utilities/validators';

@Component({
    selector: 'app-change-profile-image',
    templateUrl: './change-profile-image.component.html',
    styleUrls: ['./change-profile-image.component.scss']
})
export class ChangeProfileImageComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Input() pictureUrl: string;
    @Output() closed = new EventEmitter();
    @Output() update = new EventEmitter();
    title = 'Change profile image';


    //file
    file: File;
    private validMimeTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];
    private maxFileSizeMB = 5;

    //form
    form: FormGroup;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage };
    inProgress = false;
    error: string = '';

    messages = [
        {
            field: 'profile_image',
            errors: [
                {
                    error: 'fileType',
                    message: 'Invalid file type. Only png, jpg.'
                },
                {
                    error: 'fileSize',
                    message: 'Your profile image cannot be larger than 5MB'
                }
            ]
        },
    ];

    constructor(private apiService: ApiService, private notificationService: NotificationsService) {}

    ngOnInit()
    {
        //form
        this.form = new FormGroup({
            profile_image: new FormControl(null, Validators.required),
        });
    }


    ngAfterViewInit()
    {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onFileChange(event)
    {
        if (event.target.files.length)
        {
            const fileResource = event.target.files[0];
            if (this.validMimeTypes.indexOf(fileResource.type) !== -1 && fileResource.size < 1024 * 1024 * this.maxFileSizeMB)
                this.file = fileResource;

            const control = this.form.get('profile_image');
            control.setValue(fileResource.name);
            control.markAsTouched();
            control.setValidators([Validators.required, fileType(fileResource, this.validMimeTypes), fileSize(fileResource, this.maxFileSizeMB)]);
            control.updateValueAndValidity();
        }
    }

    onSubmit()
    {
        if(this.form.valid)
        {
            //preparing form
            const form = new FormData();
            form.append("profile_image", this.file);

            this.inProgress = true;
            this.error = "";

            //upload handle
            this.apiService.changeProfileImage(form)
                .subscribe(
                    response => {
                        this.inProgress = false;
                        this.notificationService.success('Success', 'Profile image updated');
                        this.update.emit();
                        $('#' + this.type + '_id').modal('hide');
                    },
                    error => {
                        this.inProgress = false;
                        this.error = getMessageError(error);
                    }
                );
        }
    }

    getPictureUrl(): string
    {
        return this.pictureUrl ? this.pictureUrl : 'https://www.exaclair.com/images/placeholders/team-placeholder.jpg';
    }
}

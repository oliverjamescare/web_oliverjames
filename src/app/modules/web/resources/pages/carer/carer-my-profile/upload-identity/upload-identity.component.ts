import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getMessageError, handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../../utilities/form.utils';
import { alpha, fileSize, fileType, numbers } from '../../../../../../../utilities/validators';
import { ApiService } from '../../../../../services/api.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-upload-identity',
    templateUrl: './upload-identity.component.html',
    styleUrls: ['./upload-identity.component.scss']
})
export class UploadIdentityComponent implements OnInit, AfterViewInit
{
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();
    error: string = '';

    //file
    identityFile: File;
    private validMimeTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
        "image/gif"
    ];
    private maxFileSizeMB = 5;

    //form
    form: FormGroup;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage };
    inProgress = false;

    messages = [
        {
            field: 'identity_document',
            errors: [
                {
                    error: 'fileType',
                    message: 'Invalid file type. Only png, jpg, gif, pdf or docx'
                },
                {
                    error: 'fileSize',
                    message: 'Your identity document cannot be larger than 5MB'
                }
            ]
        },
    ];


    constructor(private apiService: ApiService, private notificationService: NotificationsService) {}

    ngOnInit()
    {
        //form
        this.form = new FormGroup({
            identity_document: new FormControl(null, Validators.required),
        });
    }

    ngAfterViewInit() {
        $('#identity_modal_id').modal();
        $('#identity_modal_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onFileChange(event)
    {
        if (event.target.files.length)
        {
            const fileResource = event.target.files[0];
            if (this.validMimeTypes.indexOf(fileResource.type) !== -1 && fileResource.size < 1024 * 1024 * this.maxFileSizeMB)
                this.identityFile = fileResource;

            const control = this.form.get('identity_document');
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
            form.append("identity_document", this.identityFile);

            this.inProgress = true;
            this.error = "";

            //upload handle
            this.apiService.uploadIdentityProof(form)
                .subscribe(response => {
                        this.inProgress = false;
                        this.notificationService.success('Identity document stored');
                        $('#identity_modal_id').modal("hide");
                        this.reload.emit();
                    },
                    error => {
                        this.inProgress = false;
                        this.error = getMessageError(error);
                    }
                );
        }
    }

}

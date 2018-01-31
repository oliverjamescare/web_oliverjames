import { Component, OnInit } from '@angular/core';
import { CarerService } from '../../../../services/carer.service';
import { handleUniqueValidator, handleValidationStateClass, handleValidationErrorMessage }  from '../../../../utilities/form.utils';
import { fileSize, fileType } from '../../../../utilities/validators';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-carer-cv-upload',
    templateUrl: './register-carer-cv-upload.component.html',
    styleUrls: ['./register-carer-cv-upload.component.scss']
})
export class RegisterCarerCvUploadComponent implements OnInit
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
            completed: false
        },
        {
            name: "Q&A",
            active: false,
            completed: false
        }
    ];

    //form config
    form: FormGroup
    cv: File = null;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage }
    private validMimeTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf"
    ];
    private maxFileSizeMB = 10;

    messages = [
        {
            field: 'cv',
            errors: [
                {
                    error: 'required',
                    message: "Cv file is required"
                },
                {
                    error: 'fileType',
                    message: "Invalid file type"
                },
                {
                    error: 'fileSize',
                    message: "Your CV cannot be larger than 10MB"
                }
            ]
        },
    ];

    constructor(private router: Router, private carerService: CarerService) {}

    ngOnInit()
    {
        //protection against missing steps
        if(this.carerService.registerStep < this.carerService.availableSteps.CV)
            this.router.navigate(["/carer/register/personal-details"]);


        this.form = new FormGroup({
           cv: new FormControl(null, [ Validators.required])
        });
    }
    previousStep()
    {
        this.router.navigate(["/carer/register/personal-details"]);
    }
    onFileChange(event)
    {
        if(event.target.files.length)
        {
            const fileResource = event.target.files[0];
            if(this.validMimeTypes.indexOf(fileResource.type) != -1 && fileResource.size < 1024 * 1024 * this.maxFileSizeMB)
                this.cv = fileResource;

            const control = this.form.get('cv');
            control.setValue(fileResource.name);
            control.markAsTouched();
            control.setValidators([ Validators.required, fileType(fileResource, this.validMimeTypes), fileSize(fileResource, this.maxFileSizeMB)]);
            control.updateValueAndValidity();
        }
    }

    triggerFileBrowser(fileInput: HTMLInputElement)
    {
        fileInput.click();
    }

    onSubmit()
    {
        if(this.form.valid)
        {
            this.carerService.cv = this.cv;
            this.carerService.registerStep = this.carerService.availableSteps.QA;
            this.router.navigate(['/carer/register/questions-answers'])
        }
    }
}

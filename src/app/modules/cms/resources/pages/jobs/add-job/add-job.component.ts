import {Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { getMessageError, handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../utilities/form.utils';
import { dateGreaterThan, fileSize, fileType, invalidDate } from '../../../../../../utilities/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { JobsService } from '../../../../services/jobs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CareHomesService } from '../../../../services/care-homes.service';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit
{
    careHomeId: string;
    careHome: User;
    token: string;

    //floor plan
    floorPlanFile: File;
    private validMimeTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];
    private maxFileSizeMB = 10;

    //form handle
    form: FormGroup;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage };
    inProgress: boolean = false;
    now = new Date();
    roles: Array<string> = [
        "Carer",
        "Senior Carer"
    ]

    jobFormMessages = [
        {
            field: 'start_date',
            errors: [
                {
                    error: 'required',
                    message: 'Start date is required'
                },
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'end_date',
            errors: [
                {
                    error: 'required',
                    message: 'Start date is required'
                },
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                },
                {
                    error: 'dateGreaterThan',
                    message: 'End date must be lower than start date'
                }
            ]
        },
        {
            field: 'role',
            errors: [
                {
                    error: 'required',
                    message: 'Role is required'
                },
            ]
        },
    ];

    messages = [
        {
            field: 'floor_plan',
            errors: [
                {
                    error: 'fileType',
                    message: 'Invalid file type. Only doc, docx, pdf, png, jpg.'
                },
                {
                    error: 'fileSize',
                    message: 'Your floor plan cannot be larger than 10MB'
                }
            ]
        },
    ];

    constructor(
        private route: ActivatedRoute,
        private notificationService: NotificationsService,
        private router: Router,
        private jobsService: JobsService,
        private authService: AuthService,
        private careHomesService: CareHomesService
    ) {}

    ngOnInit()
    {
        //getting access token
        this.token = this.authService.getAccessToken();

        //getting care home id
        this.route
            .params
            .subscribe(params => {
                    this.careHomeId = params['id'];

                    //getting care home and creating form
                    this.careHomesService.getCareHome(this.careHomeId).subscribe((careHome: User) => {
                        this.careHome = careHome;
                        this.createForm();
                    })
                }
            );
    }

    onSubmit()
    {
        if(this.form.valid)
        {
            this.inProgress = true;
            this.jobsService
                .addJobs(this.form, this.careHomeId, this.floorPlanFile)
                .subscribe(
                    response => {
                        this.inProgress = false;
                        this.notificationService.success('Jobs added successfully');
                        this.router.navigate(['/','admin','jobs']);
                    },
                    (error: HttpErrorResponse) => {
                        this.inProgress = false;
                        this.notificationService.error(getMessageError(error));
                    }
                );
        }
    }

    private createForm(): void
    {
        this.form = new FormGroup({
            jobs: new FormArray([ new FormGroup({
                start_date: new FormControl(new Date(), [ Validators.required, invalidDate ]),
                end_date: new FormControl(new Date(), [ Validators.required, invalidDate ]),
                role: new FormControl(null, Validators.required),
                notes: new FormControl(null),
            })]),
            gender_preference: new FormControl(this.careHome.care_home.gender_preference),
            floor_plan: new FormControl(null),
            parking: new FormControl(this.careHome.care_home.general_guidance.parking),
            notes_for_carers: new FormControl(this.careHome.care_home.general_guidance.notes_for_carers),
            emergency_guidance: new FormControl(this.careHome.care_home.general_guidance.emergency_guidance),
            report_contact: new FormControl(this.careHome.care_home.general_guidance.report_contact),
            superior_contact: new FormControl(this.careHome.care_home.general_guidance.superior_contact)
        });

        const jobForm = (<FormArray>this.form.get("jobs")).controls[0];

        jobForm
            .get("start_date")
            .valueChanges
            .subscribe(start => {
                jobForm.get("end_date").setValidators([ Validators.required, invalidDate, dateGreaterThan(new Date(start)) ])
            });

        jobForm
            .get("end_date")
            .valueChanges
            .subscribe(end => {
                jobForm.get("end_date").setValidators([ Validators.required, invalidDate, dateGreaterThan(new Date(jobForm.get("start_date").value)) ])
            });

    }

    //jobs handle
    onAddJob()
    {
        const jobForm = new FormGroup({
            start_date: new FormControl(new Date(), [ Validators.required, invalidDate ]),
            end_date: new FormControl(new Date(), [ Validators.required, invalidDate ]),
            role: new FormControl(null, Validators.required),
            notes: new FormControl(null),
        });

        jobForm
            .get("start_date")
            .valueChanges
            .subscribe(start => {
                jobForm.get("end_date").setValidators([ Validators.required, invalidDate, dateGreaterThan(new Date(start)) ])
            });

        jobForm
            .get("end_date")
            .valueChanges
            .subscribe(end => {
                jobForm.get("end_date").setValidators([ Validators.required, invalidDate, dateGreaterThan(new Date(jobForm.get("start_date").value)) ])
            });

        (<FormArray>this.form.get("jobs")).push(jobForm);
    }

    onRemoveJob(index: number): void
    {
        const jobs = (<FormArray>this.form.get('jobs'));
        if(jobs.length > 1)
            jobs.removeAt(index);
    }

    //files handle
    onFileChange(event)
    {
        if (event.target.files.length)
        {
            const fileResource = event.target.files[0];
            if (this.validMimeTypes.indexOf(fileResource.type) !== -1 && fileResource.size < 1024 * 1024 * this.maxFileSizeMB)
                this.floorPlanFile = fileResource;

            const control = this.form.get('floor_plan');

            control.setValue(fileResource.name);
            control.markAsTouched();
            control.setValidators([Validators.required, fileType(fileResource, this.validMimeTypes), fileSize(fileResource, this.maxFileSizeMB)]);
            control.updateValueAndValidity();
        }
    }

    maxJobDuration(start: Date) : Date
    {
        const end = new Date(start.getTime());
        end.setDate(end.getDate() + 1);
        return end;
    }
}

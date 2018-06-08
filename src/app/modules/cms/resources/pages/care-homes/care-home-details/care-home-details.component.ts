import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CareHomesService } from '../../../../services/care-homes.service';
import { User } from '../../../../models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { getMessageError, handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../utilities/form.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { DatesService } from '../../../../services/dates.service';
import { AddressDetail } from '../../../../../web/models/address/address-detail.model';
import { NotificationsService } from 'angular2-notifications';
import { alpha, fileSize, fileType } from '../../../../../../utilities/validators';

@Component({
    selector: 'app-care-home-details',
    templateUrl: './care-home-details.component.html',
    styleUrls: ['./care-home-details.component.scss']
})
export class CareHomeDetailsComponent implements OnInit
{
    careHome: User;
    form: FormGroup;
    creditsForm: FormGroup;
    floor_plan: File;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage };

    private validMimeTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
        "image/png",
        "image/jpg",
        "image/jpeg"
    ];
    private maxFileSizeMB = 10;

    token: string;
    error: string = "";
    modalError: string = "";
    inProgress: boolean = false;
    id: string;
    bannMinDate = new Date();

    messages = [
        {
            field: 'name',
            errors: [
                {
                    error: 'required',
                    message: 'Name is required'
                },
                {
                    error: 'alpha',
                    message: 'Name can contain only alphabetical characters'
                },
                {
                    error: 'maxlength',
                    message: 'Name cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'postal_code',
            errors: [
                {
                    error: 'required',
                    message: 'Postcode is required'
                }
            ]
        },
        {
            field: 'address_line_1',
            errors: [
                {
                    error: 'required',
                    message: 'This field is required'
                }
            ]
        },
        {
            field: 'city',
            errors: [
                {
                    error: 'required',
                    message: 'City is required'
                }
            ]
        },
        {
            field: 'care_service_name',
            errors: [
                {
                    error: 'required',
                    message: 'Care service name is required'
                },
                {
                    error: 'alpha',
                    message: 'Care service can contain only alphabetical characters'
                },
                {
                    error: 'maxlength',
                    message: 'Care service cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'floor_plan',
            errors: [
                {
                    error: 'fileType',
                    message: 'Invalid file type'
                },
                {
                    error: 'fileSize',
                    message: 'Your floor plan cannot be larger than 10MB'
                },
            ]
        },
    ];


    constructor(
        private route: ActivatedRoute,
        private careHomesService: CareHomesService,
        private authService: AuthService,
        private notificationService: NotificationsService,
        public datesService: DatesService
    ) {}

    ngOnInit()
    {
        this.token = this.authService.getAccessToken();
        this.route
            .params
            .subscribe(params => {
                    this.id = params['id'];
                    this.loadCareHome()
                }
            );

        //form credits init
        this.creditsForm = new FormGroup({
            amount: new FormControl(""),
            type: new FormControl(""),
            description: new FormControl("")
        })
    }

    //address handle
    onAddressFound(addressDetails: AddressDetail)
    {
        this.form.patchValue({
            postal_code: addressDetails.PostalCode,
            company: addressDetails.Company,
            address_line_1: addressDetails.Line1,
            address_line_2: addressDetails.Line2,
            city: addressDetails.City
        })
    }

    onSubmit()
    {
        if(this.form.valid)
        {
            this.inProgress = true;
            this.careHomesService
                .updateCareHomeDetails(this.careHome.id, this.form, this.floor_plan)
                .subscribe(() => {
                        this.error = "";
                        this.inProgress = false;
                        this.notificationService.success("Care home details updated")
                        this.loadCareHome()
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

    //credits handle
    addCredits()
    {
        $("#credits").modal();
    }
    onAddCredits()
    {
        if(this.creditsForm.valid)
        {
            this.careHomesService
                .addCredits(this.id, this.creditsForm.value)
                .subscribe(() => {
                        $("#credits").modal("hide");
                        this.modalError = "";
                        this.creditsForm.reset();
                        this.loadCareHome();
                    },
                    (error: HttpErrorResponse) => {
                        this.modalError = getMessageError(error);
                    });
        }
    }

    //file handle
    onFileChange(event)
    {
        if (event.target.files.length)
        {
            const fileResource = event.target.files[0];
            if (this.validMimeTypes.indexOf(fileResource.type) !== -1 && fileResource.size < 1024 * 1024 * this.maxFileSizeMB)
                this.floor_plan = fileResource;


            const control = this.form.get('floor_plan');
            control.setValue(fileResource.name);
            control.markAsTouched();
            control.setValidators([ fileType(fileResource, this.validMimeTypes), fileSize(fileResource, this.maxFileSizeMB)]);
            control.updateValueAndValidity();
        }
    }

    //loading care home
    loadCareHome()
    {
        this.careHomesService
            .getCareHome(this.id)
            .subscribe((careHome: User) => {
                this.careHome = careHome;

                //form init
                this.form = new FormGroup({
                    care_service_name: new FormControl(this.careHome.care_home.care_service_name, [Validators.required, Validators.maxLength(100), alpha]),
                    name: new FormControl(this.careHome.care_home.name, [ Validators.required, Validators.maxLength(100), alpha ]),
                    notes: new FormControl(this.careHome.notes),
                    status: new FormControl(this.careHome.status),
                    banned_until:  new FormControl(this.careHome.banned_until ? moment(this.careHome.banned_until || new Date()).format("YYYY-MM-DD") : null),
                    type_of_home: new FormControl(this.careHome.care_home.type_of_home),

                    //general guidance and gender preference
                    gender_preference: new FormControl(this.careHome.care_home.gender_preference),
                    floor_plan: new FormControl(null),
                    parking: new FormControl(this.careHome.care_home.general_guidance.parking),
                    notes_for_carers: new FormControl(this.careHome.care_home.general_guidance.notes_for_carers),
                    emergency_guidance: new FormControl(this.careHome.care_home.general_guidance.emergency_guidance),
                    report_contact: new FormControl(this.careHome.care_home.general_guidance.report_contact),
                    superior_contact: new FormControl(this.careHome.care_home.general_guidance.superior_contact),

                    //adddress
                    postal_code: new FormControl(this.careHome.address.postal_code),
                    company: new FormControl(this.careHome.address.company),
                    address_line_1: new FormControl(this.careHome.address.address_line_1),
                    address_line_2: new FormControl(this.careHome.address.address_line_2),
                    city: new FormControl(this.careHome.address.city),
                })
            });
    }

}

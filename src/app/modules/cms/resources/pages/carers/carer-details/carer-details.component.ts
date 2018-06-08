import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { CarersService } from '../../../../services/carers.service';
import { ActivatedRoute } from '@angular/router';
import { CarerDetailsResponse } from '../../../../models/response/carer-details-response';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatesService } from '../../../../services/dates.service';
import { isUndefined } from 'util';
import { NotificationsService } from 'angular2-notifications';
import { getMessageError } from '../../../../../../utilities/form.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { numbers } from '../../../../../../utilities/validators';
import { AddressDetail } from '../../../../../web/models/address/address-detail.model';

@Component({
    selector: 'app-carer-details',
    templateUrl: './carer-details.component.html',
    styleUrls: ['./carer-details.component.scss']
})
export class CarerDetailsComponent implements OnInit
{
    carerId: string;
    carerDetails: CarerDetailsResponse;
    form: FormGroup;

    buttonLoading = false;
    showFileUploader = false;
    showProfilePicture = false;
    resourceName: string;
    uploadTitle: string;
    files: string[] = [];

    bannMinDate = new Date();
    deductionForm: FormGroup;
    modalError: string = '';
    inProgress: boolean = false;
    qualifications: Array<string> = [
        "Care certificate",
        "QCF / NVQ level 2 in Health & Social Care",
        "QCF / NVQ level 3 in Health & Social Care",
        "QCF / NVQ level 4 in Health & Social Care",
        "QCF / NVQ level 5 in Health & Social Care",
        "Agency carer induction training",
        "Nursing qualification (UK)",
        "Nursing qualification (elsewhere)"
    ];

    roles: Array<string> = [
        "Carer",
        "Senior Carer"
    ]

    genders: Array<string> = [
        "Male",
        "Female"
    ]

    constructor(private carersService: CarersService,
                private route: ActivatedRoute,
                private datesService: DatesService,
                private notificationService: NotificationsService) {}

    ngOnInit()
    {
        this.route.params.subscribe(
            params =>
            {
                this.carerId = params['id'];
                this.getCarerDetails();
            }
        );

        //deduction form init
        this.deductionForm = new FormGroup({
            amount: new FormControl(''),
            type: new FormControl(''),
            description: new FormControl('')
        });


    }


    //getting data
    private getCarerDetails(): void
    {
        this.carersService.getCarerDetails(this.carerId)
            .subscribe(
                (response: CarerDetailsResponse) => {
                    this.handleDetailsResponse(response);
                });
    }

    private handleDetailsResponse(response: CarerDetailsResponse): void
    {
        this.carerDetails = response;
        this.setUpFilesProperty();
        this.createForm();
    }

    //deductions
    addDeduction()
    {
        $('#deduction').modal();
    }

    onAddDeduction()
    {
        if (this.deductionForm.valid)
        {
            this.carersService
                .addDeduction(this.carerId, this.deductionForm.value)
                .subscribe(() =>
                    {
                        $('#deduction').modal('hide');
                        this.modalError = '';
                        this.deductionForm.reset();
                        this.getCarerDetails();
                    },
                    (error: HttpErrorResponse) =>
                    {
                        this.modalError = getMessageError(error);
                    });
        }
    }

    onUpdateCarerDetails(): void
    {
        this.buttonLoading = true;
        this.prepareDetailsToUpdate();
        this.carersService.updateCarerDetails(this.carerId, this.carerDetails)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    this.notificationService.success('Carer details updated');
                    this.getCarerDetails();
                },
                error => {
                    this.buttonLoading = false;
                    this.notificationService.error('Carer details update failed');
                }
            );
    }

    onAddReference(): void
    {
        (<FormArray>this.form.get('reference')).push(
            new FormGroup({
                'name': new FormControl(null),
                'type': new FormControl(null)
            })
        );
    }

    onRemoveReference(index: number): void
    {
        (<FormArray>this.form.get('reference')).removeAt(index);
    }

    onPopupOpen(resourceName: string): void
    {
        this.resourceName = resourceName;
        this.showFileUploader = true;
        this.setUpFilesProperty();
    }

    onReload(): void
    {
        this.getCarerDetails();
    }

    setUpFilesProperty(): void
    {
        switch (this.resourceName)
        {
            case 'training_record':
            {
                this.files = this.carerDetails.carer.training_record.files;
                this.uploadTitle = 'Photographic evidence';
                break;
            }
            case 'cv':
            {
                this.files = this.carerDetails.carer.cv_uploads;
                this.uploadTitle = 'CV uploads';
                break;
            }
            case 'dbs':
            {
                this.files = this.carerDetails.carer.dbs.files;
                this.uploadTitle = 'Dbs photo record';
                break;
            }
            case 'reference':
            {
                this.files = this.carerDetails.carer.reference.files;
                this.uploadTitle = 'Photo evidence';
                break;
            }
        }
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

    private createForm(): void
    {
        const refArr = new FormArray([]);
        if (this.carerDetails && !isUndefined(this.carerDetails.carer.reference.references))
        {
            this.carerDetails.carer.reference.references.forEach((ref) =>
            {
                refArr.push(new FormGroup({
                    'name': new FormControl(ref.name),
                    'type': new FormControl(ref.type)
                }));
            });
        }

        this.form = new FormGroup({
            reference: refArr,
            notes: new FormControl(this.carerDetails.notes),
            status: new FormControl(this.carerDetails.status),
            banned_until: new FormControl(this.carerDetails.banned_until ? moment(this.carerDetails.banned_until || new Date()).format("YYYY-MM-DD") : null),
            gender: new FormControl(this.carerDetails.carer.gender),

            //training record
            safeguarding: new FormControl(this.carerDetails.carer.training_record.safeguarding ? moment(this.carerDetails.carer.training_record.safeguarding || new Date()).format("YYYY-MM-DD") : null),
            manual_handling_people: new FormControl(this.carerDetails.carer.training_record.manual_handling_people ? moment(this.carerDetails.carer.training_record.manual_handling_people || new Date()).format("YYYY-MM-DD") : null),
            first_aid_and_basic_life_support: new FormControl(this.carerDetails.carer.training_record.first_aid_and_basic_life_support ? moment(this.carerDetails.carer.training_record.first_aid_and_basic_life_support || new Date()).format("YYYY-MM-DD") : null),
            infection_control: new FormControl(this.carerDetails.carer.training_record.infection_control ? moment(this.carerDetails.carer.training_record.infection_control || new Date()).format("YYYY-MM-DD") : null),
            h_and_s: new FormControl(this.carerDetails.carer.training_record.h_and_s ? moment(this.carerDetails.carer.training_record.h_and_s || new Date()).format("YYYY-MM-DD") : null),
            fire_safety: new FormControl(this.carerDetails.carer.training_record.fire_safety ? moment(this.carerDetails.carer.training_record.fire_safety || new Date()).format("YYYY-MM-DD") : null),
            dementia: new FormControl(this.carerDetails.carer.training_record.dementia ? moment(this.carerDetails.carer.training_record.dementia || new Date()).format("YYYY-MM-DD"): null),
            medication_management: new FormControl(this.carerDetails.carer.training_record.medication_management  ? moment(this.carerDetails.carer.training_record.medication_management || new Date()).format("YYYY-MM-DD") : null),
            first_aid_awareness: new FormControl(this.carerDetails.carer.training_record.first_aid_awareness ? moment(this.carerDetails.carer.training_record.first_aid_awareness).format("YYYY-MM-DD") : null),
            training_other: new FormControl(this.carerDetails.carer.training_record.other),
            qualifications: new FormArray(
                this.qualifications.map(qualification =>
                    new FormControl(this.carerDetails.carer.training_record.qualifications.includes(qualification))
                )
            ),

            //dbs
            dbs_date: new FormControl(this.carerDetails.carer.dbs.dbs_date ? moment(this.carerDetails.carer.dbs.dbs_date).format("YYYY-MM-DD") : null),
            dbs_ref_number: new FormControl(this.carerDetails.carer.dbs.ref_number),
            dbs_status: new FormControl(this.carerDetails.carer.dbs.status),

            //care exp
            experience_months: new FormControl(this.carerDetails.carer.joining_care_experience.months, [ Validators.min(0), Validators.max(12), numbers]),
            experience_years: new FormControl(this.carerDetails.carer.joining_care_experience.years, [ Validators.min(0), numbers]),

            //eligible roles
            eligible_roles: new FormArray(
                this.roles.map(role =>
                    new FormControl(this.carerDetails.carer.eligible_roles.includes(role))
                )
            ),

            //address
            postal_code: new FormControl(this.carerDetails.address.postal_code, Validators.required),
            company: new FormControl(this.carerDetails.address.company),
            address_line_1: new FormControl(this.carerDetails.address.address_line_1, Validators.required),
            address_line_2: new FormControl(this.carerDetails.address.address_line_2),
            city: new FormControl(this.carerDetails.address.city, Validators.required),
        });
    }

    private prepareDetailsToUpdate(): void
    {
        //training record
        const qualifications = [];
        this.form.get('qualifications').value.forEach((value, index) => {
            if(value)
                qualifications.push(this.qualifications[index]);
        })
        this.carerDetails.carer.training_record.qualifications = qualifications;
        this.carerDetails.carer.training_record.other = this.form.get('training_other').value === '' ? null : this.form.get('training_other').value;
        this.carerDetails.carer.training_record.safeguarding = this.form.get('safeguarding').value || null;
        this.carerDetails.carer.training_record.manual_handling_people = this.form.get('manual_handling_people').value || null;
        this.carerDetails.carer.training_record.first_aid_and_basic_life_support = this.form.get('first_aid_and_basic_life_support').value || null;
        this.carerDetails.carer.training_record.infection_control = this.form.get('infection_control').value || null;
        this.carerDetails.carer.training_record.h_and_s = this.form.get('h_and_s').value || null;
        this.carerDetails.carer.training_record.fire_safety = this.form.get('fire_safety').value || null;
        this.carerDetails.carer.training_record.dementia = this.form.get('dementia').value || null;
        this.carerDetails.carer.training_record.medication_management = this.form.get('medication_management').value || null;
        this.carerDetails.carer.training_record.first_aid_awareness = this.form.get('first_aid_awareness').value || null;

        //dbs
        this.carerDetails.carer.dbs.dbs_date = this.form.get('dbs_date').value || null;
        this.carerDetails.carer.dbs.ref_number = this.form.get('dbs_ref_number').value;
        this.carerDetails.carer.dbs.status = this.form.get('dbs_status').value;

        //references
        this.carerDetails.carer.reference.references = this.form.get('reference').value;

        //care experience
        this.carerDetails.carer.joining_care_experience.years = this.form.get('experience_years').value;
        this.carerDetails.carer.joining_care_experience.months = this.form.get('experience_months').value;

        //roles
        const roles = [];
        this.form.get('eligible_roles').value.forEach((value, index) => {
            if(value)
                roles.push(this.roles[index]);
        })
        this.carerDetails.carer.eligible_roles = roles;

        //rest
        this.carerDetails.carer.gender = this.form.get('gender').value;
        this.carerDetails.notes = this.form.get('notes').value;
        this.carerDetails.status = this.form.get('status').value;

        //bann
        if(this.form.get('banned_until').value !== '')
        {
            const date = new Date(this.form.get('banned_until').value);
            date.setHours(23,59,59,999);
            this.carerDetails.banned_until = date.getTime();
        }
        else
            this.carerDetails.banned_until = null;


        //address
        this.carerDetails.address.city = this.form.get('city').value;
        this.carerDetails.address.address_line_2 = this.form.get('address_line_2').value;
        this.carerDetails.address.address_line_1 = this.form.get('address_line_1').value;
        this.carerDetails.address.company = this.form.get('company').value;
        this.carerDetails.address.postal_code = this.form.get('postal_code').value;
    }
}

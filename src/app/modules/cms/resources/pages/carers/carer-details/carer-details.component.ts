import {Component, OnInit} from '@angular/core';
import {CarersService} from '../../../../services/carers.service';
import {ActivatedRoute} from '@angular/router';
import {CarerDetailsResponse} from '../../../../models/response/carer-details-response';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DatesService} from '../../../../services/dates.service';
import {isUndefined} from 'util';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-carer-details',
    templateUrl: './carer-details.component.html',
    styleUrls: ['./carer-details.component.scss']
})
export class CarerDetailsComponent implements OnInit {
    carerId: string;
    carerDetails: CarerDetailsResponse;
    form: FormGroup;

    buttonLoading = false;
    showFileUploader = false;
    resourceName: string;
    uploadTitle: string;
    files: string[] = [];

    constructor(private carersService: CarersService,
                private route: ActivatedRoute,
                private datesService: DatesService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.carerId = params['id'];
                this.getCarerDetails();
                this.createForm();
            }
        );
    }

    onUpdateCarerDetails(): void {
        this.buttonLoading = true;
        console.log('Details form', this.form.value);
        this.prepareDetailsToUpdate();
        console.log('Prepared details', this.carerDetails);
        this.carersService.updateCarerDetails(this.carerId, this.carerDetails)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    this.notificationService.success('Carer details updated');
                    console.log('Update carer details success response', response);
                },
                error => {
                    this.buttonLoading = false;
                    this.notificationService.error('Carer details update failed');
                    console.log('Update carer details error', error);
                }
            );
    }

    onAddReference(): void {
        (<FormArray>this.form.get('reference')).push(
            new FormGroup({
                'name': new FormControl(null),
                'type': new FormControl(null)
            })
        );
    }

    onRemoveReference(index: number): void {
        (<FormArray>this.form.get('reference')).removeAt(index);
    }

    onPopupOpen(resourceName: string): void {
        this.resourceName = resourceName;
        this.showFileUploader = true;
        this.setUpFilesProperty();
    }

    onReload(): void {
        this.getCarerDetails();
    }

    setUpFilesProperty(): void {
        switch (this.resourceName) {
            case 'training_record': {
                this.files = this.carerDetails.carer.training_record.files;
                this.uploadTitle = 'Photographic evidence';
                break;
            }
            case 'cv': {
                this.files = this.carerDetails.carer.cv_uploads;
                this.uploadTitle = 'CV uploads';
                break;
            }
            case 'dbs': {
                this.files = this.carerDetails.carer.dbs.files;
                this.uploadTitle = 'Dbs photo record';
                break;
            }
            case 'reference': {
                this.files = this.carerDetails.carer.reference.files;
                this.uploadTitle = 'Photo ewidence';
                break;
            }
        }
    }

    private getCarerDetails(): void {
        this.carersService.getCarerDetails(this.carerId)
            .subscribe(
                (response: CarerDetailsResponse) => {
                    this.handleDetailsResponse(response);
                },
                error => console.log('Get carer details error', error)
            );
    }

    private handleDetailsResponse(response: CarerDetailsResponse): void {
        console.log('Get carer details response', response);
        this.carerDetails = response;
        this.setUpFilesProperty();
        this.createForm();
        this.setUpForm();
    }

    private createForm(): void {
        const refArr = new FormArray([]);
        if (this.carerDetails && !isUndefined(this.carerDetails.carer.reference.references)) {
            this.carerDetails.carer.reference.references.forEach((ref) => {
                refArr.push(new FormGroup({
                    'name': new FormControl(ref.name),
                    'type': new FormControl(ref.type)
                }));
            });
        }
        this.form = new FormGroup({
            'training_other': new FormControl(),
            'dbs_date': new FormControl(),
            'dbs_ref_number': new FormControl(),
            'dbs_status': new FormControl(),
            'reference': refArr,
            'job_role1': new FormControl(),
            'job_role2': new FormControl(null),
            'notes': new FormControl(),
            'status': new FormControl(),
            'banned_until': new FormControl()
        });
    }

    private setUpForm(): void {
        this.form.get('training_other').setValue(this.carerDetails.carer.training_record.other);
        this.form.get('dbs_date').setValue(this.datesService.getDateString(this.carerDetails.carer.dbs.dbs_date));
        this.form.get('dbs_ref_number').setValue(this.carerDetails.carer.dbs.ref_number);
        this.form.get('dbs_status').setValue(this.carerDetails.carer.dbs.status);
        // to do
        this.setUpFormJobRoles();
        this.form.get('notes').setValue(this.carerDetails.notes);
        this.form.get('status').setValue(this.carerDetails.status);
        this.form.get('banned_until').setValue(this.datesService.getDateString(this.carerDetails.banned_until));
    }

    private setUpFormJobRoles(): void {
        this.form.get('job_role1').setValue(this.carerDetails.carer.eligible_roles[0]);
        if (!isUndefined(this.carerDetails.carer.eligible_roles[1])) {
            this.form.get('job_role2').setValue(this.carerDetails.carer.eligible_roles[1]);
        }
    }

    private prepareDetailsToUpdate(): void {
        this.carerDetails.carer.training_record.other = this.form.get('training_other').value === '' ?
            null : this.form.get('training_other').value;
        this.carerDetails.carer.dbs.dbs_date = new Date(this.form.get('dbs_date').value).getTime();
        this.carerDetails.carer.dbs.ref_number = this.form.get('dbs_ref_number').value;
        this.carerDetails.carer.dbs.status = this.form.get('dbs_status').value;
        this.carerDetails.carer.reference.references = this.form.get('reference').value;
        this.carerDetails.carer.joining_care_experience.years = 1;
        this.carerDetails.carer.joining_care_experience.months = 1;
        this.carerDetails.carer.eligible_roles = this.getEilgableRoles();
        this.carerDetails.notes = this.form.get('notes').value;
        this.carerDetails.status = this.form.get('status').value;
        this.carerDetails.banned_until = this.form.get('banned_until').value === '' ?
            null : new Date(this.form.get('banned_until').value).getTime();
    }

    private getEilgableRoles(): string[] {
        const arr = [];
        arr.push(this.form.get('job_role1').value);
        if (this.form.get('job_role2').value !== null && this.form.get('job_role2').value !== '') {
            arr.push(this.form.get('job_role2').value);
        }
        return arr;
    }

}

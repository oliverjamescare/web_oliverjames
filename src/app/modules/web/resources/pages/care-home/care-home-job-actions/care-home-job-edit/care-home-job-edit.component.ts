import {Component, OnDestroy, OnInit, AfterViewInit} from '@angular/core';
import {CareHomeService} from '../../../../../services/care-home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import * as dateformat from 'dateformat';
import {Subscription} from 'rxjs/Subscription';
import {NotificationsService} from 'angular2-notifications';
import {isUndefined} from 'util';
import {getMessageError} from '../../../../../../../utilities/form.utils';

const TIMESTAMP_INTERVAL = 900000; // 15 min in milliseconds
const MIN_IN_MILLISECONDS = 60000;
const NUMBER_OF_INTERVALS = 97; // number of 15 min intervals in select list hour from 7:00, 19:00

@Component({
    selector: 'app-care-home-job-edit',
    templateUrl: './care-home-job-edit.component.html',
    styleUrls: ['./care-home-job-edit.component.scss']
})
export class CareHomeJobEditComponent implements OnInit, OnDestroy {
    form: FormGroup;
    floorPlanFile: File;
    floorPlanError: string;
    fileName: string = null;

    timeArr: { timestamp: number, formatedDate: string }[] = [];
    genders: string[] = ['No preference', 'Male', 'Female'];

    private allowedMimeTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];

    initStart: string;
    initFrom: string;
    initTill: string;

    showWarningPopup = false;

    buttonLoading = false;
    detailsLoaded: Subscription;


    constructor(public careHomeService: CareHomeService,
                private route: ActivatedRoute,
                private authService: AuthService,
                private notificationService: NotificationsService,
                private router: Router) {
    }

    ngOnInit() {
        this.createForm();

        this.subscribeToDetailsLoaded();
        if (this.careHomeService.jobDetails) {
            this.setUpForm();


        }
        this.setHoursIntervals();
        this.getJobDetails();
    }


    ngOnDestroy() {
        this.detailsLoaded.unsubscribe();
    }

    handleFileInput(files: FileList) {
        const file = files.item(0);
        if (this.allowedMimeTypes.indexOf(file.type) !== -1) {
            this.floorPlanError = null;
            this.floorPlanFile = file;
            this.fileName = file.name;
        } else {
            this.floorPlanError = 'Invalid file type';
        }
    }

    getFloorPlanLink(link: string): string {
        if (link) {
            return `${link}?access-token=${this.authService.getAccessToken().token}`;
        }
        else {
            return null;
        }
    }

    subscribeToDetailsLoaded(): void {
        this.detailsLoaded = this.careHomeService.detailsLoaded
            .subscribe(
                () => {
                    this.setUpForm();
                    this.setDatepickers();
                }
            );
    }

    onBackToDetails(): void {
        this.router.navigate(['/care-home-job-actions', this.careHomeService.jobDetails._id, 'details']);
    }

    onEditJob(): void {
        if (this.checkFields()) {
            if (this.canEdit()) {
                this.buttonLoading = true;
                this.careHomeService.editJob(this.careHomeService.jobDetails._id, this.prepareDataToUpdate())
                    .subscribe(
                        response => {
                            this.buttonLoading = false;
                            this.notificationService.success('Job edited successfully');
                            this.getJobDetails();
                        },
                        error => {
                            this.buttonLoading = false;
                            this.notificationService.error('Job edited failed. ' + getMessageError(error));
                        }
                    );
            } else {
                this.showWarningPopup = true;
            }
        }
    }

    private setDatepickers(): void {
        $('#startJob').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            minDate: new Date(new Date(new Date().setDate(new Date().getDate() - 1))),
            maxDate: new Date(new Date().setDate(new Date().getDate() + 35)),
            value: moment(this.careHomeService.jobDetails.start_date).format('YYYY-MM-DD'),
            hide: (event: Event) => {
                this.form.get('start').setValue(event.target['value']);
            }
        });
    }

    private getInitialToDate(): Date {
        const endTimestamp = new Date().getTime();
        return new Date(endTimestamp);
    }

    private getJobDetails(): void {
        this.careHomeService.getJobDetails(this.careHomeService.jobDetails._id)
            .subscribe(
                response => {
                },
                error => {
                }
            );
    }

    private canEdit(): boolean {
        return !(this.isDateModified() && this.isJobAccepted());
    }

    private isDateModified(): boolean {
        if (this.initStart !== this.form.get('start').value ||
            this.initFrom !== this.form.get('start_date').value ||
            this.initTill !== this.form.get('end_date').value) {
            console.log('Date modified');
            return true;
        } else {
            console.log('Date not modified');
            return false;
        }
    }

    private isJobAccepted(): boolean {
        console.log('Job accepted', this.careHomeService.jobDetails.carer);
        return !isUndefined(this.careHomeService.jobDetails.carer);
    }

    private prepareDataToUpdate(): any {
        const formData = new FormData();
        formData.append('start_date', `${this.getDate('start_date')}`);
        formData.append('end_date', `${this.getDate('end_date')}`);
        formData.append('role', this.form.get('role').value);
        if (this.floorPlanFile) {
            formData.append('floor_plan', this.floorPlanFile);
        }
        formData.append('parking', this.form.get('parking').value);
        formData.append('notes_for_carers', this.form.get('notes_for_carers').value);
        formData.append('emergency_guidance', this.form.get('emergency_guidance').value);
        formData.append('report_contact', this.form.get('report_contact').value);
        formData.append('superior_contact', this.form.get('superior_contact').value);
        formData.append('gender_preference', this.form.get('gender_preference').value);
        if (this.form.get('notes').value) {
            formData.append('notes', this.form.get('notes').value);
        }
        else {
            formData.append('notes', '');
        }
        return formData;
    }

    private checkFields(): boolean {
        if (!this.form.get('report_contact').value) {
            this.notificationService.error('Job edited failed. Contact on arrival is required.');
            return false;
        }
        if (!this.form.get('superior_contact').value) {
            this.notificationService.error('Job edited failed. Suprior contact is required.');
            return false;
        }
        if (!this.form.get('parking').value) {
            this.notificationService.error('Job edited failed. Parking is required.');
            return false;
        }
        if (!this.form.get('notes_for_carers').value) {
            this.notificationService.error('Job edited failed. Notes for carers is required.');
            return false;
        }
        if (!this.form.get('emergency_guidance').value) {
            this.notificationService.error('Job edited failed. Emergency guidance is required.');
            return false;
        }
        return true;

    }


    private createForm(): void {
        this.form = new FormGroup({
            start: new FormControl(null),
            start_date: new FormControl(null),
            end_date: new FormControl(null),
            role: new FormControl(null),
            floor_plan: new FormControl(null),
            parking: new FormControl(null, Validators.required),
            notes_for_carers: new FormControl(null, Validators.required),
            emergency_guidance: new FormControl(null, Validators.required),
            report_contact: new FormControl(null, Validators.required),
            superior_contact: new FormControl(null, Validators.required),
            notes: new FormControl(''),
            gender_preference: new FormControl(null),
        });
    }

    private setUpForm(): void {
        this.form.get('start').setValue(dateformat(this.careHomeService.jobDetails.start_date, 'yyyy-mm-dd'));
        this.initStart = dateformat(this.careHomeService.jobDetails.start_date, 'yyyy-mm-dd');
        this.form.get('start_date').setValue(dateformat(this.careHomeService.jobDetails.start_date, 'shortTime'));
        this.initFrom = dateformat(this.careHomeService.jobDetails.start_date, 'shortTime');
        this.form.get('end_date').setValue(dateformat(this.careHomeService.jobDetails.end_date, 'shortTime'));
        this.initTill = dateformat(this.careHomeService.jobDetails.end_date, 'shortTime');
        this.form.get('role').setValue(this.careHomeService.jobDetails.role);
        this.form.get('parking').setValue(this.careHomeService.jobDetails.general_guidance.parking);
        this.form.get('notes_for_carers').setValue(this.careHomeService.jobDetails.general_guidance.notes_for_carers);
        this.form.get('emergency_guidance').setValue(this.careHomeService.jobDetails.general_guidance.emergency_guidance);
        this.form.get('report_contact').setValue(this.careHomeService.jobDetails.general_guidance.report_contact);
        this.form.get('superior_contact').setValue(this.careHomeService.jobDetails.general_guidance.superior_contact);
        this.form.get('notes').setValue(this.careHomeService.jobDetails.notes);
        this.form.get('gender_preference').setValue(this.careHomeService.jobDetails.gender_preference);


    }

    private getDate(property: string): number {
        const d = new Date(this.form.get('start').value);
        d.setHours(0, 0, 0, 0);
        const hour = new Date(this.getTimestamp(this.form.get(property).value));
        d.setHours(hour.getHours(), hour.getMinutes(), hour.getSeconds());
        return d.getTime();
    }

    private getTimestamp(formatedDate: string): number {
        let findedTimestamp = 0;
        this.timeArr.forEach((element) => {
            if (element.formatedDate === formatedDate) {
                console.log('inside loop', element.timestamp);
                findedTimestamp = element.timestamp;
            }
        });
        return findedTimestamp + MIN_IN_MILLISECONDS;
    }

    private getStartTime(): Date {
        const date = new Date(this.form.get('start').value);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    private setHoursIntervals(): void {
        for (let i = 0; i < NUMBER_OF_INTERVALS; i++) {
            if (i === NUMBER_OF_INTERVALS - 1) {
                this.timeArr.push({
                    timestamp: this.getStartTime().getTime() + i * TIMESTAMP_INTERVAL - MIN_IN_MILLISECONDS,
                    formatedDate: dateformat(this.getStartTime().getTime() + i * TIMESTAMP_INTERVAL - MIN_IN_MILLISECONDS, 'shortTime')
                });
            } else {
                this.timeArr.push({
                    timestamp: this.getStartTime().getTime() + i * TIMESTAMP_INTERVAL - MIN_IN_MILLISECONDS,
                    formatedDate: dateformat(this.getStartTime().getTime() + i * TIMESTAMP_INTERVAL, 'shortTime')
                });
            }
        }
    }

}

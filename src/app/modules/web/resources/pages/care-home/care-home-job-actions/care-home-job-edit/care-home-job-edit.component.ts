import {Component, OnDestroy, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../../services/care-home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../services/auth.service';
import * as dateformat from 'dateformat';
import {Subscription} from 'rxjs/Subscription';
import {NotificationsService} from 'angular2-notifications';
import {isUndefined} from 'util';

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

    timeArr: { timestamp: number, formatedDate: string }[] = [];

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
    }

    ngOnDestroy() {
        this.detailsLoaded.unsubscribe();
    }

    handleFileInput(files: FileList) {
        const file = files.item(0);
        if (this.allowedMimeTypes.indexOf(file.type) !== -1) {
            this.floorPlanError = null;
            this.floorPlanFile = file;
        } else {
            this.floorPlanError = 'Invalid file type';
        }
    }

    getFloorPlanLink(link: string): string {
        return `${link}?access-token=${this.authService.getAccessToken().token}`;
    }

    subscribeToDetailsLoaded(): void {
        this.detailsLoaded = this.careHomeService.detailsLoaded
            .subscribe(
                () => {
                    this.setUpForm();
                }
            );
    }

    onBackToDetails(): void {
        this.router.navigate(['/care-home-job-actions', this.careHomeService.jobDetails._id, 'details']);
    }

    onEditJob(): void {
        if (this.canEdit()) {
            this.buttonLoading = true;
            this.careHomeService.editJob(this.careHomeService.jobDetails._id, this.prepareDataToUpdate())
                .subscribe(
                    response => {
                        this.buttonLoading = false;
                        console.log('Edit job details success response', response);
                        this.notificationService.success('Job edited successfully');
                        this.getJobDetails();
                    },
                    error => {
                        this.buttonLoading = false;
                        console.log('Edit job details error response', error);
                    }
                );
        } else {
            this.showWarningPopup = true;
        }
    }

    private getJobDetails(): void {
        this.careHomeService.getJobDetails(this.careHomeService.jobDetails._id)
            .subscribe(
                response => {
                    console.log('Get job detail success response', response);
                },
                error => {
                    console.log('Get job detail error response', error);
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
        formData.append('notes', this.form.get('notes').value);

        return formData;
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

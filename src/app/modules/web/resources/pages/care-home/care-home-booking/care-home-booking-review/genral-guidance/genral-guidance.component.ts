import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';
import {AuthService} from '../../../../../../services/auth.service';

@Component({
    selector: 'app-general-guidance',
    templateUrl: './genral-guidance.component.html',
    styleUrls: ['./genral-guidance.component.scss']
})
export class GeneralGuidanceComponent implements OnInit {
    form: FormGroup;
    floorPlanError: string;

    private validMimeTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];

    constructor(public bookingService: CareHomeBookingService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.createGuidanceForm();
        this.setUpForm();
        this.listenToFormChanges();
    }

    handleFileInput(files: FileList) {
        const file = files.item(0);
        if (this.validMimeTypes.indexOf(file.type) !== -1) {
            this.floorPlanError = null;
            this.bookingService.florPlanFile = file;
        } else {
            this.floorPlanError = 'Invalid file type';
        }
    }

    getFloorPlan(): string {
        return `${this.bookingService.generalGuidance.floor_plan}?access-token=${this.authService.getAccessToken().token}`;
    }

    private createGuidanceForm(): void {
        this.form = new FormGroup({
            'floor_plan': new FormControl(null, Validators.required),
            'parking': new FormControl(null, Validators.required),
            'notes_for_carers': new FormControl(null, Validators.required),
            'emergency_guidance': new FormControl(null, Validators.required),
            'report_contact': new FormControl(null, Validators.required),
            'superior_contact': new FormControl(null, Validators.required)
        });
    }

    private setUpForm(): void {
        this.form.setValue(this.bookingService.generalGuidanceForm);
    }

    private listenToFormChanges(): void {
        this.form.valueChanges.debounceTime(400)
            .subscribe(
                data => this.bookingService.generalGuidanceForm = data
            );
    }

}

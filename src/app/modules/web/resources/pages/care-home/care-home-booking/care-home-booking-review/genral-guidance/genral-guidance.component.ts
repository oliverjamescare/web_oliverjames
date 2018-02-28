import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';
import {GeneralGuidance} from '../../../../../../models/care-home-booking/general-guidance';

@Component({
    selector: 'app-general-guidance',
    templateUrl: './genral-guidance.component.html',
    styleUrls: ['./genral-guidance.component.scss']
})
export class GeneralGuidanceComponent implements OnInit {
    form: FormGroup;

    constructor(public bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.createGuidanceForm();
        this.getGuidanceInfo();
        this.listenToFormChanges();
    }

    handleFileInput(files: FileList) {
        this.bookingService.florPlanFile = files.item(0);
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

    private getGuidanceInfo(): void {
        this.bookingService.getGuidanceInfo()
            .subscribe(
                (response: GeneralGuidance) => {
                    this.bookingService.generalGuidance = response;
                    console.log('Get general guidance response', response);
                    this.setUpForm();
                },
                error => console.log('Get guidance error response', error)
            );
    }

    private setUpForm(): void {
        this.form.setValue(this.bookingService.generalGuidance);
    }

    private listenToFormChanges(): void {
        this.form.valueChanges.debounceTime(400)
            .subscribe(
                data => this.bookingService.generalGuidanceForm = data
            );
    }

}

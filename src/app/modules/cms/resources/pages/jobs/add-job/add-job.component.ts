import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {handleValidationErrorMessage, handleValidationStateClass} from '../../../../../../utilities/form.utils';

@Component({
    selector: 'app-add-job',
    templateUrl: './add-job.component.html',
    styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    careHomeId: string;
    searchTerm: FormControl;
    searchResult: any[] = [];
    careHomesNotFound: string;

    messages = [
        {
            field: 'startDate',
            errors: [
                {
                    error: 'required',
                    message: 'Start date is required'
                }
            ]
        },
    ];

    constructor() {
    }

    ngOnInit() {
        this.createForm();
    }

    private createForm(): void {
        this.searchTerm = new FormControl(null);
        this.form = new FormGroup({
            startDate: new FormControl(null, Validators.required),
            from: new FormControl(null),
            till: new FormControl(null),
            duration: new FormGroup({
                hours: new FormControl(null),
                minutes: new FormControl(null)
            }),
            role: new FormControl(null),
            manual_booking: new FormControl(''),
            gender_preference: new FormControl(null),
            floor_plan: new FormControl(null),
            parking: new FormControl(null),
            emergency_guidance: new FormControl(null),
            report_contact: new FormControl(null),
            superior_contact: new FormControl(null)
        });

        $('#startDate').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            value: moment(new Date()).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('startDate').setValue(event.target['value'])
        });
    }

    // private getCarers(): void {
    //     this.searchTerm.valueChanges
    //         .debounceTime(400)
    //         .subscribe(data => {
    //             this.careHomesNotFound = null;
    //             if (data !== '') {
    //                 this.jobsService.getCareHomes(data).subscribe(response => {
    //                     this.searchResult = response;
    //                     console.log('searchResult', this.searchResult);
    //                     if (response.length === 0) {
    //                         this.careHomesNotFound = 'No carers found';
    //                     }
    //                 });
    //             } else {
    //                 this.searchResult = [];
    //             }
    //         });
    // }

}

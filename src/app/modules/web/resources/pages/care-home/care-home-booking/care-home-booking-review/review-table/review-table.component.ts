import {Component, OnInit} from '@angular/core';
import {PreBookedJob} from '../../../../../../models/care-home-booking/pre-booked-job';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-review-table',
    templateUrl: './review-table.component.html',
    styleUrls: ['./review-table.component.scss']
})
export class ReviewTableComponent implements OnInit {
    showTable = false;
    form: FormGroup;

    constructor(public bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.checkCarersToContact();
    }

    onJobRemove(index: number): void {
        this.bookingService.removePreBookedJob(index);
    }

    getTotalHours(job: PreBookedJob): string {
        const diff = job.getEndDate().getHours() - job.getStartDate().getHours();
        return diff > 0 ? `${diff}` : 'Less than hour';
    }

    private checkCarersToContact(): void {
        this.bookingService.cheekCarersToContact()
            .subscribe(
                (response: PreBookedJob[]) => {
                    this.bookingService.preBookedJobs = response;
                    this.createForm();
                    this.detectFormChanges();
                    this.showTable = true;
                }, error => {
                    console.log('check carers to contact error response', error);
                }
            );
    }

    private createForm(): void {
        const notesArr = new FormArray([]);
        this.bookingService.preBookedJobs.forEach((job) => {
            notesArr.push(new FormControl(job.notes));
        });
        this.form = new FormGroup({
            'arr': notesArr
        });
    }

    private detectFormChanges(): void {
        this.form.valueChanges.debounceTime(400).subscribe(
            value => {
                value.arr.forEach((element, index) => {
                    this.bookingService.preBookedJobs[index].notes = element;
                });
            }
        );
    }

}

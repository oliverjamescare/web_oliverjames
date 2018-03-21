import {Component, OnInit} from '@angular/core';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Carer} from '../../../../../../models/care-home-booking/Carer';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-booking-search',
    templateUrl: './booking-search.component.html',
    styleUrls: ['./booking-search.component.scss']
})
export class BookingSearchComponent implements OnInit {
    form: FormGroup;
    searchTerm: FormControl = new FormControl();

    searchResult: Carer[] = [];
    carersNotFoundMessage = null;

    constructor(private bookingService: CareHomeBookingService,
                private router: Router,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.getPriorityCarers();
    }

    onSelect(carer: Carer): void {
        this.searchResult = [];
        this.addPriorityCarer(carer);
        this.searchTerm.setValue('');
        console.log('Selected carers', this.bookingService.priorityCarers);
    }

    onClickOutside(): void {
        this.searchResult = [];
        this.searchTerm.setValue('');
    }

    onNavigateNext(): void {
        this.bookingService.preBookedJobs.length === 0 ?
            this.notificationService.warn('Cannot go next', 'You did not book any jobs')
            : this.router.navigate(['/care-home-booking', 'review']);
    }

    private getPriorityCarers(): void {
        this.searchTerm.valueChanges
            .debounceTime(400)
            .subscribe(data => {
                this.carersNotFoundMessage = null;
                if (data !== '') {
                    this.bookingService.searchForPriority(data).subscribe(response => {
                        this.searchResult = response;
                        console.log('searchResult', this.searchResult);
                        if (response.length === 0) {
                            this.carersNotFoundMessage = 'No carers found';
                        }
                    });
                } else {
                    this.searchResult = [];
                }
            });
    }

    private addPriorityCarer(carer: Carer): void {
        let repeated = false;
        this.bookingService.priorityCarers.forEach((listedCarer) => {
            if (listedCarer._id === carer._id) {
                repeated = true;
            }
        });
        !repeated ? this.bookingService.priorityCarers.push(carer) : this.notificationService.warn('This carer was already added');
    }

}


import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../../../services/api.service';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';

@Component({
    selector: 'app-preference-tab',
    templateUrl: './preference-tab.component.html',
    styleUrls: ['./preference-tab.component.scss']
})
export class PreferenceTabComponent implements OnInit {
    selectedTab = 0;

    constructor(private apiService: ApiService,
                public bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.getProfile();
    }

    onTabChange(index: number): void {
        this.selectedTab = index;
        this.bookingService.genderPreference = this.selectedTab;
    }

    private getProfile(): void {
        switch (this.bookingService.genderPreference) {
            case 1:
                this.selectedTab = 1;
                break;
            case 2:
                this.selectedTab = 2;
                break;
            default:
                this.selectedTab = 0;
                break;
        }
    }


}

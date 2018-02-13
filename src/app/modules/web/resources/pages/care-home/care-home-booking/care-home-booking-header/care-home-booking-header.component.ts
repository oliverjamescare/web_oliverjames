import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-care-home-booking-header',
    templateUrl: './care-home-booking-header.component.html'
})
export class CareHomeBookingHeaderComponent implements OnInit {
    @Input() navigationRoute: string;
    @Input() navigationTitle: string;
    @Input() mainTitle: string;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    onNavigateBack(): void {
        this.router.navigate([this.navigationRoute]);
    }

}

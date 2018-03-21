import {Component, OnInit} from '@angular/core';
import {CarersService} from '../../../../services/carers.service';
import {ActivatedRoute} from '@angular/router';
import {CarerDetailsResponse} from '../../../../models/response/carer-details-response';

@Component({
    selector: 'app-carer-details',
    templateUrl: './carer-details.component.html',
    styleUrls: ['./carer-details.component.scss']
})
export class CarerDetailsComponent implements OnInit {
    carerId: string;
    carerDetails: CarerDetailsResponse;

    constructor(private carersService: CarersService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.carerId = params['id'];
                this.getCarerDetails();
            }
        );
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
    }

}

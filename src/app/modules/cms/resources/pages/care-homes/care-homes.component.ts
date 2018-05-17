import { Component, OnInit } from '@angular/core';
import { CareHomesService } from '../../../services/care-homes.service';

@Component({
    selector: 'app-care-homes',
    templateUrl: './care-homes.component.html',
    styleUrls: ['./care-homes.component.scss'],
    providers: [ CareHomesService ]
})
export class CareHomesComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}

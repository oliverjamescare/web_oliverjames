import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-cms-popup',
    templateUrl: './cms-popup.component.html',
    styleUrls: ['./cms-popup.component.scss']
})
export class CmsPopupComponent implements OnInit {

    @Input() title = '';
    @Input() id = 'popup';
    @Input() showLogo = true;

    constructor() {
    }

    ngOnInit() {

    }

}

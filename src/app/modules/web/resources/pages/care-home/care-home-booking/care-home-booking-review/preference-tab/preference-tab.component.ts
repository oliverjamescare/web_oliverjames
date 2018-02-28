import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-preference-tab',
    templateUrl: './preference-tab.component.html',
    styleUrls: ['./preference-tab.component.scss']
})
export class PreferenceTabComponent implements OnInit {
    selectedTab = 0;

    constructor() {
    }

    ngOnInit() {
    }

    onTabChange(index: number): void {
        this.selectedTab = index;
    }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: [ './popup.component.scss' ]
})
export class PopupComponent implements OnInit
{
    @Input() title: string = "";
    @Input() id: string = "popup";
    constructor() { }

    ngOnInit()
    {

    }
}

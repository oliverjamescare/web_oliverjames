import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnChanges
{
    @Input() numberOfPages: number = 0;
    @Input() currentPage: number = 0;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter();
    pages: Array<number> = [];

    constructor() {}

    ngOnChanges()
    {
        this.pages = Array.from(Array(this.numberOfPages).keys());
    }

    //emits outside page changed event
    onPageChangeClicked(page: number)
    {
        this.pageChanged.emit(page);
    }
}

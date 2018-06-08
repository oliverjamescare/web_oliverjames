import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {password} from '../../../../../utilities/validators';
import {handleValidationErrorMessage, handleValidationStateClass} from '../../../../../utilities/form.utils';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnChanges, OnInit {
    @Input() numberOfPages: number = 0;
    @Input() currentPage: number = 1;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter();
    pages: Array<number> = [];
    form: FormGroup;

    formUtils = {handleValidationStateClass, handleValidationErrorMessage};


    constructor() {
    }

    ngOnChanges() {
        this.pages = Array.from(Array(this.numberOfPages).keys());
    }

    ngOnInit() {
        this.createPageForm();
    }

    createPageForm() {
        this.form = new FormGroup({
            pageField: new FormControl(this.currentPage, [Validators.required, Validators.pattern('^\\d*\\.?\\d*$')]),
        });

    }

    pageValidity(key): boolean {
        key = parseInt(key, 10);
        if ((typeof key == 'number') && (key > 0) && (key <= this.numberOfPages)) {
            return true;
        }
        return false;
    }


    decrementPageValue(): void {
        if (this.pageValidity(this.currentPage - 1)) {
            this.currentPage--;
            this.pageChanged.emit(this.currentPage);
            this.createPageForm();
        }
    }

    incrementPageValue(): void {
        if (this.pageValidity(this.currentPage + 1)) {
            this.currentPage++;
            this.pageChanged.emit(this.currentPage);
            this.createPageForm();
        }
    }

    onSubmit(): void {
        const pageValue = parseInt(this.form.value.pageField, 10);
        if (this.pageValidity(pageValue)) {
            this.currentPage = pageValue;
            this.pageChanged.emit(this.currentPage);
        }
    }
}

import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarersService} from '../../../../../../services/carers.service';

@Component({
    selector: 'app-delete-file',
    templateUrl: './delete-file.component.html',
    styleUrls: ['./delete-file.component.scss']
})
export class DeleteFileComponent implements OnInit, AfterViewInit {
    @Input() type = 'confirm';
    @Output() deleteFile = new EventEmitter<string>();
    @Output() closed = new EventEmitter();

    title = 'Confirmation dialog';

    constructor(private carersService: CarersService) {
    }

    ngOnInit() {
        console.log('Confirmation dialog works');
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onDeleteFile(): void {
        this.deleteFile.emit();
        this.onClose();
    }

    onClose(): void {
        $('#' + this.type + '_id').modal('hide');
        this.closed.emit();
    }

}

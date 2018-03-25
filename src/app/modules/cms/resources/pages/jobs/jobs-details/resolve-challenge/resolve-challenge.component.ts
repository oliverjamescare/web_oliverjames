import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {JobsService} from '../../../../../services/jobs.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-resolve-challenge',
    templateUrl: './resolve-challenge.component.html',
    styleUrls: ['./resolve-challenge.component.scss']
})
export class ResolveChallengeComponent implements OnInit, AfterViewInit {
    @Input() title: string;
    @Input() type: string;
    @Input() jobId: string;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();

    form: FormGroup;

    constructor(private jobsService: JobsService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.createForm();
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onClose(): void {
        $('#' + this.type + '_id').modal('hide');
        this.closed.emit();
    }

    onResolveChallenge(): void {
        this.jobsService.resolveChallange(this.jobId, this.form.get('conclusion').value, this.form.get('reason').value)
            .subscribe(
                response => {
                    console.log('Resolve challenge success response', response);
                    this.notificationService.success('Challange resolved');
                    this.onClose();
                },
                error => {
                    console.log('Resolve challenge error response', error);
                }
            );
    }

    private createForm(): void {
        this.form = new FormGroup({
            'conclusion': new FormControl('UPHELD'),
            'reason': new FormControl(null)
        });
    }

}

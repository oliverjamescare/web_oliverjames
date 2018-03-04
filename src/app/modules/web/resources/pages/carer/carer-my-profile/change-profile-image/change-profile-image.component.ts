import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../../services/api.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-change-profile-image',
    templateUrl: './change-profile-image.component.html',
    styleUrls: ['./change-profile-image.component.scss']
})
export class ChangeProfileImageComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Input() pictureUrl: string;
    @Output() closed = new EventEmitter();
    @Output() update = new EventEmitter();
    title = 'Change profile image';
    profilePicture: File;

    constructor(private apiService: ApiService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    handleFileInput(files: FileList) {
        this.profilePicture = files.item(0);
    }

    getPictureUrl(): string {
        return this.pictureUrl ? this.pictureUrl : 'https://www.exaclair.com/images/placeholders/team-placeholder.jpg';
    }

    onPictureChange(): void {
        this.apiService.changeProfileImage(this.getRequestData())
            .subscribe(
                response => {
                    console.log('Update profile picture success response', response);
                    this.notificationService.success('Success', 'Profile image updated');
                    this.update.emit();
                    $('#' + this.type + '_id').modal('hide');
                },
                error => {
                    console.log('Updte profile picture error respone', error);
                }
            );
    }

    private getRequestData(): FormData {
        const formData: FormData = new FormData();
        formData.append('profile_image', this.profilePicture);
        return formData;
    }

}

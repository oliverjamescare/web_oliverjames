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
    errors: string[] = [];
    buttonLoading = false;

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
        console.log('File to upload', files.item(0).size);
        this.errors = [];
        if (files.item(0).size > 5000000) {
            this.errors.push('Max file size exceed');
        }
        if (!this.isValidImageExtension(files.item(0).name)) {
            this.errors.push('Only files with .jpeg and .gif extensions can be uploaded');
        }
        console.log('Errors table', this.errors);
        this.profilePicture = files.item(0);
    }

    private isValidImageExtension(filename: string): boolean {
        const splited = filename.split('.');
        return splited[1] === 'jpg' || splited[1] === 'png';
    }

    getPictureUrl(): string {
        return this.pictureUrl ? this.pictureUrl : 'https://www.exaclair.com/images/placeholders/team-placeholder.jpg';
    }

    onPictureChange(): void {
        this.buttonLoading = true;
        this.apiService.changeProfileImage(this.getRequestData())
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    console.log('Update profile picture success response', response);
                    this.notificationService.success('Success', 'Profile image updated');
                    this.update.emit();
                    $('#' + this.type + '_id').modal('hide');
                },
                error => {
                    this.buttonLoading = false;
                    this.notificationService.warn('Update profile picture failed');
                    console.log('Update profile picture error response', error);
                }
            );
    }

    private getRequestData(): FormData {
        const formData: FormData = new FormData();
        formData.append('profile_image', this.profilePicture);
        return formData;
    }

}

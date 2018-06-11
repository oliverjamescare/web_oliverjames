import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CarersService} from '../../../../../services/carers.service';
import {AuthService} from '../../../../../services/auth.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-file-uploading',
    templateUrl: './file-uploading.component.html',
    styleUrls: ['./file-uploading.component.scss']
})
export class FileUploadingComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() title: string;
    @Input() type: string;
    @Input() carerId: string;
    @Input() resourceName: string;
    @Input() files: string[];
    @Output() closed = new EventEmitter();

    @Output() reload = new EventEmitter();
    currentFile: string;
    currentFileIndex: number;
    showConfirmationPopup = false;
    buttonLoading = false;

    uploadErros: string[] = [];
    filesToUpload: FileList;

    private validMimeTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];

    constructor(private carersService: CarersService,
                private authService: AuthService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        console.log('files array', this.files);
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    ngOnChanges() {
    }

    handleFileInput(files: FileList) {
        console.log('Files', files);
        this.uploadErros = [];
        const keys = Object.keys(files);
        if (keys.length > 5) {
            this.uploadErros.push('You can upload only 5 files');
        }
        keys.forEach((key) => {
            const file = files.item(+key);
            if (this.validMimeTypes.indexOf(file.type) === -1) {
                this.uploadErros.push(`File ${+key + 1} has invalid file type`);
            }
            if (file.size > 10000000) {
                this.uploadErros.push(`File ${+key + 1} is to large, max 10 MB`);
            }
        });
        if (this.uploadErros.length === 0) {
            this.filesToUpload = files;
        }
    }

    onFilesUpload(): void {
        this.buttonLoading = true;
        const formData: any = new FormData();
        const files = this.filesToUpload;
        console.log(files);

        if(files && files.length)
        {
            for (let i = 0; i < files.length; i++)
                formData.append('files', files[i], files[i]['name']);

            this.carersService.uploadCarerResources(this.carerId, this.resourceName, formData)
                .subscribe(
                    response => {
                        this.buttonLoading = false;
                        $('#' + this.type + '_id').modal("hide");
                        this.notificationService.success('Files uploaded successfully');
                        this.reload.emit();
                    },
                    error => {
                        console.log('Upload files error response', error);
                        this.buttonLoading = false;
                    }
                );
        }
    }

    onDeleteFile(): void {
        this.carersService.deleteResourceFile(this.carerId, this.resourceName, this.currentFile)
            .subscribe(
                response => {
                    console.log('Delete file success response', response);
                    this.notificationService.success('File deleted successfully');
                    this.files.splice(this.currentFileIndex, 1);
                },
                error => {
                    console.log('Delete file failed with error', error);
                    this.notificationService.error('Delete file failed');
                }
            );
    }

    onOpenPopup(file: string, index: number): void {
        this.currentFile = file;
        this.currentFileIndex = index;
        this.showConfirmationPopup = true;
    }

    getTokenParameter(): string {
        return `?access-token=${this.authService.getAccessToken()}`;
    }

}

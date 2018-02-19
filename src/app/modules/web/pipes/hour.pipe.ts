import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'hourPipe'})
export class HourPipe implements PipeTransform {
    transform(value: Date): string {
        return value.toLocaleTimeString().substr(0, 5);
    }
}
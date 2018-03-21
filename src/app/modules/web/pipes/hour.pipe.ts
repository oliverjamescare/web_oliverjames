import {Pipe, PipeTransform} from '@angular/core';
import * as dateformat from 'dateformat';

@Pipe({name: 'hourPipe'})
export class HourPipe implements PipeTransform {
    transform(value: Date): string {
        return dateformat(value, 'shortTime');
    }
}

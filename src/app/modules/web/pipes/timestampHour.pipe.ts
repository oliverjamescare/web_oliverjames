import {Pipe, PipeTransform} from '@angular/core';
import * as dateformat from 'dateformat';

@Pipe({name: 'timestampHour'})
export class TimestampHourPipe implements PipeTransform {
    transform(value: number): string {
        return dateformat(value, 'shortTime');
    }
}

import {Pipe, PipeTransform} from '@angular/core';
import * as dateformat from 'dateformat';

@Pipe({name: 'timestampHour'})
export class TimestampHourPipe implements PipeTransform {
    transform(value: number): string {
        const date = new Date(value);
        return value !== null ? dateformat(date, 'shortTime') : null;
    }
}
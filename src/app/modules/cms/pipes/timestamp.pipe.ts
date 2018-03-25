import {Pipe, PipeTransform} from '@angular/core';
import * as dateformat from 'dateformat';

@Pipe({name: 'timestamp'})
export class TimestampPipe implements PipeTransform {
    transform(value: number): string {
        const date = new Date(value);
        return value !== null ? dateformat(date, 'yyyy-mm-dd') : null;
    }
}
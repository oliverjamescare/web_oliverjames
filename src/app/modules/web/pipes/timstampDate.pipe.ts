import {Pipe, PipeTransform} from '@angular/core';
import * as dateformat from 'dateformat';

@Pipe({name: 'timestampDate'})
export class TimestampDatePipe implements PipeTransform
{
    transform(value: number): string
    {
        return value !== null ? dateformat(value, 'yyyy-mm-dd') : '';
    }
}

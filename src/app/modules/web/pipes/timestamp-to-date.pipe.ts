import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform
{
    transform(value: number): Date
    {
        return new Date(value);
    }
}

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datePattern'
})
export class DatePatternPipe implements PipeTransform
{
    transform(value: Date | number, pattern: string): string
    {
        return moment(value).format(pattern);
    }
}

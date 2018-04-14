import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'yearPipe'})
export class YearPipe implements PipeTransform {
    transform(value: number): string {
        if (value === 1) {
            return '1 year';
        }
        if (value > 1) {
            return `${value} years`;
        }
        return '';
    }
}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'monthPipe'})
export class MonthPipe implements PipeTransform {
    transform(value: number): string {
        if (value === 1) {
            return '1 month';
        }
        if (value > 1) {
            return `${value} months`;
        }
        return '';
    }
}
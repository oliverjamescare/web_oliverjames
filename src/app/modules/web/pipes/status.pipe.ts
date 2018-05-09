import {Pipe, PipeTransform} from '@angular/core';
import * as dateformat from 'dateformat';

@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(/_/g, ' ');
    }
}

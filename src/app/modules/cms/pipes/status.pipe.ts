import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform
{
    transform(value: string, args?: any): string
    {
        return value.replace(/_/g, "");
    }

}

import { FormControl } from '@angular/forms';

export function alpha(control: FormControl): { [ key: string ]: boolean }
{
    return !XRegExp('^[\\p{L}\\s]*$').test(control.value)? { "alpha": true } : null;
}
export function numbers(control: FormControl): { [ key: string ]: boolean }
{
    return !/^[0-9]*$/.test(control.value)? { "numbers": true } : null;
}
export function alphaNumbers(control: FormControl): { [ key: string ]: boolean }
{
    return !XRegExp('^[\\p{L}\\s0-9]*$').test(control.value)? { "alphaNumbers": true } : null;
}
export function adult(control: FormControl): { [ key: string ]: boolean }
{
    let now = new Date();
    now.setFullYear(now.getFullYear() - 18);

    let value = new Date(control.value);
    return !value || now.getTime() >= value.getTime()? { "adult": true } : null;
}

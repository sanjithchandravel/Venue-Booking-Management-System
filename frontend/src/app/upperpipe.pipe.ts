import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperpipe',
})
export class UpperpipePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Handle null or undefined values
    return value.toUpperCase(); // Convert text to uppercase
  }
}

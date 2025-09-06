import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxNumOfLetters',
})
export class MaxNumOfLettersPipe implements PipeTransform {
  transform(value: string, max: number): unknown {
    if (value.length > max) {
      value = value.slice(0, max - 1) + '…';
    }
    return value;
  }
}

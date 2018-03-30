import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intervalJsonToTimeString'
})
export class IntervalJsonToTimeStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let timeString = '';

    let hours = value.hours ? value.hours : 0;
    if (hours > 0) {
      timeString += hours + ':';
    }
    let minutes = value.minutes ? value.minutes : 0;
    timeString += ((minutes > 9) ? '' : '0') + minutes + ':';

    let seconds = value.seconds ? value.seconds : 0;
    timeString += ((seconds > 9) ? '' : '0') + seconds;
    
    return timeString;
  }

}

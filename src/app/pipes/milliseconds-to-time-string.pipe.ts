import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millisecondsToTimeString'
})
export class MillisecondsToTimeStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let oneSecond = 1000;
    let oneMinute = oneSecond * 60;
    let oneHour = oneMinute * 60;
    let oneDay = oneHour * 24;

    let seconds = Math.floor((value % oneMinute) / oneSecond);
    let minutes = Math.floor((value % oneHour) / oneMinute);
    let hours = Math.floor(value / oneHour);

    let timeString = '';
    
    if (hours !== 0) {
        timeString += hours + ':';
    }
    timeString += ((minutes > 9) ? minutes : '0' + minutes) + ':';
    timeString += (seconds > 9) ? seconds : '0' + seconds;

    return timeString;
  }

}

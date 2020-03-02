import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'moment',
    pure: false
})

export class PipeMoment implements PipeTransform {

    /** Форматируем переданну дату по указанному формату и возвращаем дату в качетве строки */
    transform(m: moment.Moment, format = 'MMMM, YYYY'): string {
        return m.format(format);
    }
}
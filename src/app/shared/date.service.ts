import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DateService {

    public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

    /**
     * Изменение месяца в календаре
     * @param step Шаг для переключения месяца (1 следующий или -1 предыдущий)
     */
    changeMonth(step: number) {
        const value = this.date.value.add(step, 'month');
        this.date.next(value);
    }

    changeDay(day: moment.Moment) {
        const value = this.date.value.set({
            date: day.date(),
            month: day.month()
        });

        this.date.next(value);
    }

}
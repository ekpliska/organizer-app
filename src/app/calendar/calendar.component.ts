import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../shared/date.service';

interface Day {
    value: moment.Moment,
    active: boolean,
    disabled: boolean,
    selected: boolean
};

interface Week {
    days: Day[]
}

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    public calendar: Week[];

    constructor(private dateService: DateService) {

    }

    ngOnInit(): void {
        this.dateService.date.subscribe(this.generateDatesOfCalendar.bind(this));
    }

    /**
     * Формирование списка дат для текущего месяца
     * @param now Текущий выбранный месяц из селектора выбора месяца (хедер)
     */
    generateDatesOfCalendar(now: moment.Moment) {
        const startDateMonth = now.clone().startOf('month').startOf('week');
        const endDateMonth = now.clone().endOf('month').endOf('week');

        const date = startDateMonth.clone().subtract(1, 'day');

        const calendar = [];

        while (date.isBefore(endDateMonth, 'day')) {
            calendar.push({
                // Создаем массив, 7 дней недели
                days: Array(7)
                    // Заполняем его первоначально "0"
                    .fill(0)
                    .map(() => {
                        const value = date.add(1, 'day').clone();
                        // Определяем активную дату в календаре, сравнивая ее value
                        const active = moment().isSame(value, 'date');
                        // Определяем вхождение даты в текущий месяц
                        const disabled = !now.isSame(value, 'month');
                        // Выбранная дата в календаре
                        const selected = now.isSame(value, 'date');

                        return {
                            value,
                            active,
                            disabled,
                            selected
                        }
                    })
            });

            this.calendar = calendar;
        }

    }

    selectDay(day: moment.Moment) {
        this.dateService.changeDay(day);
    }

}

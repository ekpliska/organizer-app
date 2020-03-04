import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DateService } from '../shared/date.service';
import { TaskService, Task } from '../shared/task.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-organizer',
    templateUrl: './organizer.component.html',
    styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

    public form: FormGroup;
    public tasks: Task[] = [];

    constructor(public dateService: DateService, private taskService: TaskService) { }

    ngOnInit(): void {

        this
            .dateService.date.pipe(
                switchMap(value => this.taskService.load(value))
            )
            .subscribe(tasks => {
                this.tasks = tasks
            })

        this.form = new FormGroup({
            title: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        const { title } = this.form.value;
        const task: Task = {
            title,
            date: this.dateService.date.value.format('DD-MM-YYYY')
        };

        this.taskService.create(task).subscribe(task => {
            this.tasks.push(task);
            this.form.reset();
        }, err => console.log(err));
    }

    removeTask(task) {
        this.taskService
            .remove(task)
            .subscribe(() => {
                this.tasks = this.tasks.filter(taskItem => taskItem.id !== task.id)
            }, err => {
                console.log(err);
                
            });
    }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './types/todo';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
_todos: Todo[] = [];
activeTodos: Todo[] = [];

get todos() {
  return this._todos;
}

set todos(todos: Todo[]) {
  if (todos === this._todos) {
    return;
  }

  this._todos = todos;
  this.activeTodos = this._todos.filter(todo => !todo.completed);
}

  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),
  });

  constructor(
    private todosService: TodosService,
  ) {}

  ngOnInit(): void {
    this.todosService.todos$
    .subscribe((todos) => {
      this.todos = todos;
    });
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle)
      .subscribe();
    }

  toggleTodo(todo: Todo) {
    this.todosService.updateTodo({
      ...todo,
      completed: !todo.completed,
    })
    .subscribe()
  }

  renameTodo(todo: Todo, title: string) {
    this.todosService.updateTodo({
      ...todo,
      title })
    .subscribe();
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo)
      .subscribe();
  }
}

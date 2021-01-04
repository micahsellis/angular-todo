import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private tS:TodoService) { }

  ngOnInit(): void {
    this.tS.getTodos().subscribe(todos => {
      this.todos = todos
    });
  }

  deleteTodo(todo: Todo): void {
    this.tS.deleteTodo(todo).subscribe(this.todos = this.todos.filter(t => t.id !== todo.id));
  }

  addTodo(todo: Todo) {
    this.tS.addTodo(todo).subscribe(todo => {
      this.todos.push(todo)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { from } from 'rxjs';
import { Todo } from './todo';
import { TodoService } from './todo.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  todos: Todo[] = [];
  form: FormGroup = new FormGroup({
    description : new FormControl('', [Validators.required , Validators.minLength(4)] )
  })

  constructor(
    private service: TodoService
  ){}

  ngOnInit(){
    this.listarTodos()
  }

  listarTodos(){
    this.service.listar().subscribe(todoList =>
      this.todos = todoList)
  }

  submit(){
    console.log(this.form.value)
    const todo: Todo = { ...this.form.value }
    this.service.salvar(todo)
    .subscribe(todo => {
      this.todos.push(todo)
      this.form.reset()
    })
  }

  delete(todo: Todo){
    let id:number = todo.id!;
    this.service.deletar(id)
     .subscribe({
       next: (response) => this.listarTodos()
     })
  }

  done(todo: Todo) {
    let id:number = todo.id!;
    this.service.marcarConcluido(id)
     .subscribe({
       next: (todoAtualizado) => {
         todo.done = todoAtualizado.done
         todo.doneDate = todoAtualizado.doneDate
       }
     })
  }


}

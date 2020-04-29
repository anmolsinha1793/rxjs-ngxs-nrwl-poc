import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoState } from '../state/todo.state';
import { UpdateTodo, AddTodo, SetSelectedTodo } from '../actions/todo.action';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'nrwl-poc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit,OnDestroy {

  @Select(TodoState.getSelectedTodo) selectedTodo: Observable<Todo>;
    todoForm: FormGroup;
    editTodo = false;
    private formSubscription: Subscription = new Subscription();

    constructor(private fb: FormBuilder, private store: Store) {
        this.createForm();
    }

    ngOnInit() {
        this.formSubscription.add(
          this.selectedTodo.subscribe(todo => {
            if (todo) {
              this.todoForm.patchValue({
                id: todo.id,
                userId: todo.userId,
                title: todo.title
              });
              this.editTodo = true;
            } else {
              this.editTodo = false;
            }
          })
        );
    }

    createForm() {
        this.todoForm = this.fb.group({
            id: [''],
            userId: ['', Validators.required],
            title: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.editTodo) {
          this.formSubscription.add(
            this.store.dispatch(new UpdateTodo(this.todoForm.value, this.todoForm.value.id)).subscribe(() => {
              this.clearForm();
            })
          );
        } else {
          this.formSubscription.add(
            this.formSubscription = this.store.dispatch(new AddTodo(this.todoForm.value)).subscribe(() => {
              this.clearForm();
            })
          );
        }
    }

    clearForm() {
        this.todoForm.reset();
        this.store.dispatch(new SetSelectedTodo(null));
    }
    ngOnDestroy(){
      this.formSubscription.unsubscribe();
    }
}

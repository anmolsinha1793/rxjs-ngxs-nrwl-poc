import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './todos.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    TodoService
  ]
})
export class ApiModule {

}

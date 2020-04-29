import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPocComponent } from './test-poc/test-poc.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './state/todo.state';

@NgModule({
  imports: [CommonModule,HttpClientModule,ReactiveFormsModule, NgxsModule.forFeature([TodoState])],
  declarations: [TestPocComponent, ListComponent, FormComponent],
  exports: [TestPocComponent, ListComponent, FormComponent]
})
export class StoreLibModule {}

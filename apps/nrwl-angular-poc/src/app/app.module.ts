import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {StoreLibModule} from '@nrwl-poc/store-lib';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { NgxsModule } from '@ngxs/store';
import { TutorialState } from '../state/tutorial.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { DeleteComponent } from './delete/delete.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiModule} from '@nrwl-poc/api';
import { DemoRxjsComponent } from './demo-rxjs/demo-rxjs.component';
import { SharedServiceService } from './service/shared-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NgxsApiDemoComponent } from './ngxs-api-demo/ngxs-api-demo.component';
import { NgxsNoApiDemoComponent } from './ngxs-no-api-demo/ngxs-no-api-demo.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MenuComponent } from './menu/menu.component';




@NgModule({
  declarations: [AppComponent, CreateComponent, ReadComponent, DeleteComponent, DemoRxjsComponent, NgxsApiDemoComponent, NgxsNoApiDemoComponent, MenuComponent],
  imports: [BrowserModule, StoreLibModule, ApiModule,AppRoutingModule,
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot(),
  NgxsModule.forRoot([
    TutorialState
  ]),
  HttpClientModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  MatButtonModule],
  providers: [SharedServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}

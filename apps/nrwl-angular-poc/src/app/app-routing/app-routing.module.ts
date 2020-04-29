import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { DemoRxjsComponent } from '../demo-rxjs/demo-rxjs.component';
import { NgxsApiDemoComponent } from '../ngxs-api-demo/ngxs-api-demo.component';
import { NgxsNoApiDemoComponent } from '../ngxs-no-api-demo/ngxs-no-api-demo.component';

const routes: Routes = [
  
  {
    path: 'rxjsdemo',
    component: DemoRxjsComponent,
  },
  {
    path: 'ngxsapidemo',
    component: NgxsApiDemoComponent,
  },
  {
    path: 'ngxsnoapidemo',
    component: NgxsNoApiDemoComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: false})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
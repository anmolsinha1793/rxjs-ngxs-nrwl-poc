import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nrwl-poc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  routeToNgxsApiDemo () {
    this.route.navigate([`/ngxsapidemo`]);
  }
  routeToNgxsNoApiDemo () {
    this.route.navigate([`/ngxsnoapidemo`]);
  }
  routeToRxjsDemo () {
    this.route.navigate([`/rxjsdemo`]);
  }
}

import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  sub = new Subject();
  bsub = new BehaviorSubject({});

  constructor() { }
}

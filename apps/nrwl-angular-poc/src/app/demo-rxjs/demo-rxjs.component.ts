import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap, concatMap, mergeMap, tap, take, catchError, retry, shareReplay, skipUntil, exhaustMap, startWith, takeUntil, groupBy, toArray, map, scan, reduce, withLatestFrom, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SubSink } from 'subsink';
import { Subject, BehaviorSubject, throwError, timer, interval, defer, of, from, zip, forkJoin, combineLatest, race, Observable } from 'rxjs';
import { SharedServiceService } from '../service/shared-service.service';

const newurl = 'https://reqres.in/api/users';
const errurl = 'https://reqres.in/api/unknown/23';
const todourl = 'https://jsonplaceholder.typicode.com/todos';
const users = 'https://jsonplaceholder.typicode.com/users';
const grpbyurl = 'https://reqres.in/api/unknown';

@Component({
  selector: 'nrwl-poc-demo-rxjs',
  templateUrl: './demo-rxjs.component.html',
  styleUrls: ['./demo-rxjs.component.scss']
})
export class DemoRxjsComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  private subject = new Subject<any>();
  private bsubject = new BehaviorSubject<any>(null);
  data = this.http.get(newurl)
    .pipe(
      take(1),
      tap(res => {
        this.subject.next(res)
        this.bsubject.next(res)
      }),
      shareReplay()
    )

  userObs: Observable<Object>;
  userid = 1;
  dataid;
  buttonsArr = ['demoSwitchMap','demoMergeMap','demoConcatMap','demoExhaustMap','demoCatcherror','demoShareReplay','demoDefer','demoStartWith','demogroupBy','demoSkipUntil','demotakeUntil','demoScan','demoZip','demoCombineLatest','demoForkJoin','demowithLatestFrom','demoRace','demoSubject','demoBehaviorSubject','demoTap','demoTake'];
  id = interval(5).pipe(take(5));
  constructor(private http: HttpClient, private sharedserv: SharedServiceService) {
    this.userObs = defer(() => (this.http.get(`${newurl}/${this.userid}`)));
    // this.userObs = this.http.get(`${newurl}/${this.userid}`);
  }

  ngOnInit(): void {
    console.log(this.buttonsArr.length);
  }
  /**
   * This method demonstrates switch map functionality
   * @remarks
   * SwitchMap cancels the previous subscriptions and subscribe to the latest event.
   * @param id - series of number events
   * @returns void
   */
  demoSwitchMap(id: Observable<number>): void {
    // const id = interval(5).pipe(take(5));
    id.pipe(
      switchMap((res) => this.http.get(`${newurl}/${res + 1}`))
    )
      .subscribe(res => {
        console.log('switchmap', res);
      })
  }
  /**
  * This method demonstrates merge map functionality
  * @remarks
  * MergeMap carries out all the subscriptions irrespective of order.
  * @param id - series of number events
  * @returns void
  */
  demoMergeMap(id: Observable<number>): void {
    // const id = interval(5).pipe(take(5));
    this.subs.sink = id.pipe(
      mergeMap((res) => this.http.get(`${newurl}/${res + 1}`))
    )
      .subscribe(res => {
        console.log('mergemap', res);
      })
  }
  /**
   * This method demonstrates concat map functionality
   * @remarks
   * Concat carries out all the subscriptions but in order.
   * @returns void
   */
  demoConcatMap(): void {
    const id = interval(20).pipe(take(12));
    this.subs.sink = id.pipe(
      concatMap((res) => this.http.get(`${newurl}/${res + 1}`))
    )
      .subscribe(res => {
        console.log('concatMap', res);
      })
  }
  /**
   * This method demonstrates exhaust map functionality
   * @remarks
   * ExhaustMap ignores the upcoming events till the current one completes.
   * @returns void
   */
  demoExhaustMap(): void {
    const id = interval(500).pipe(take(10));
    this.subs.sink = id.pipe(
      exhaustMap((res) => this.http.get(`${newurl}/${res + 1}`))
    )
      .subscribe(res => {
        console.log('exhaustmap', res);
      })
  }
  /**
   * This method demonstrates catcherror functionality
   * @remarks
   * Catcherror handles error from an observable sequence.
   * @returns void
   */
  demoCatcherror(): void {
    this.subs.sink = this.http.get(errurl)
      .pipe(
        catchError((err) => throwError(err)),
        retry(2)
      )
      .subscribe((data) => {
        console.log('success cb', data);
      }, err => {
        console.log('err cb', err);
      })
  }
  /**
   * This method demonstrates sharereplay functionality
   * @remarks
   * Sharereplay prevents duplicate http calls.
   * @returns void
   */
  demoShareReplay(): void {
    const shareObs = this.http.get(newurl).pipe(
      shareReplay()
    );

    shareObs.subscribe(res => {
      console.log('subscription 1', res);
    });
    shareObs.subscribe(res => {
      console.log('subscription 2', res);
    });
  }
  /**
   * This method demonstrates startwith functionality
   * @remarks
   * Startswith ensures we emit the given value first.
   * @returns void
   */
  demoStartWith(): void {
    const id = of(1, 2, 3, 4).pipe(startWith(3));
    id.pipe(
      mergeMap((res) => this.http.get(`${newurl}/${res}`))
    )
      .subscribe(res => {
        console.log('start with', res);
      })
  }
  /**
   * This method demonstrates defer functionality
   * @remarks
   * Defer is used to create observable on demand when we subscribe.
   * @returns void
   */
  demoDefer(): void {
    this.userid = 2;
    this.userObs.subscribe((res) => {
      console.log('Subscription 1', res);
    });

    this.userid = 3;

    this.userObs.subscribe((res) => {
      console.log('Subscription 2', res);
    });
  }
  /**
   * This method demonstrates groupby functionality
   * @remarks
   * Groupby is used to order/organize data by a given key.
   * @returns void
   */
  demogroupBy(): void {
    this.http.get(todourl)
      .pipe(
        switchMap((res: any[]) => from(res)),
        groupBy((res: any) => res.completed),
        mergeMap(group => group.pipe(toArray()))
      )
      .subscribe(res => console.log(`grpby ${res[0].completed}`, res));
  }
  /**
   * This method demonstrates skipuntil functionality
   * @remarks
   * Skipuntil skips the emitted values till the provided observable emits.
   * @returns void
   */
  demoSkipUntil(): void {
    const id = interval(20).pipe(take(12));
    this.subs.sink = id.pipe(
      skipUntil(timer(80)),
      mergeMap((res) => this.http.get(`${newurl}/${res + 1}`))
    )
      .subscribe(res => console.log('skipuntil', res));
  }
  /**
   * This method demonstrates takeuntil functionality
   * @remarks
   * Takeuntil emits values until the provided obs emits.
   * @returns void
   */
  demotakeUntil(): void {
    const id = interval(20).pipe(take(12));
    this.subs.sink = id.pipe(
      takeUntil(timer(90)),
      mergeMap((res) => this.http.get(`${newurl}/${res + 1}`))
    )
      .subscribe(res => console.log('takeuntil', res));
  }
  /**
   * This method demonstrates scan functionality
   * @remarks
   * Scan runs a function on each emitted value and also subscribes to each emission.
   * @returns void
   */
  demoScan(): void {
    this.http.get(newurl)
      .pipe(
        map((res: any) => res.data),
        scan((acc: any, curr: any) => acc.concat(curr), ['Please Select'])
      ).subscribe(
        res => console.log('scan', res)
      )
  }
  /**
   * This method demonstrates zip functionality
   * @remarks
   * Zip triggers/subscribes once all the observables have emitted.
   * @returns void
   */
  demoZip(): void {
    let id1, id2;
    const data1 = defer(() => (this.http.get(`${newurl}/${id1}`)));
    const data2 = defer(() => (this.http.get(`${users}/${id2}`)));
    const id1obs = interval(200).pipe(take(2)); //0,1 => 1,2
    const id2obs = interval(500).pipe(take(3)); //0,1,2 => 2,3,4
    zip(id1obs, id2obs)
      .pipe(
        concatMap(([d1, d2]) => {
          id1 = d1 + 1;
          id2 = d2 + 2;
          return zip(data1, data2)
        })
      )
      .subscribe(([res1, res2]) => {
        console.log('zip operator', res1, res2);
      })
  }
  /**
   * This method demonstrates combinelatest functionality
   * @remarks
   * Combinelatest triggers/subscribes once any the observables have emitted.
   * @returns void
   */
  demoCombineLatest(): void {
    let id1, id2;
    const data1 = defer(() => (this.http.get(`${newurl}/${id1}`)));
    const data2 = defer(() => (this.http.get(`${users}/${id2}`)));
    const id1obs = interval(200).pipe(take(2));//0,1 => 1,2
    const id2obs = interval(500).pipe(take(3));//0,1,2 => 1,2,3
    combineLatest([id1obs, id2obs])
      .pipe(
        concatMap(([d1, d2]) => {
          id1 = d1 + 1;
          id2 = d2 + 1;
          return zip(data1, data2)
        })
      )
      .subscribe(([res1, res2]) => {
        console.log('combinelatest operator', res1, res2);
      })
  }
  /**
   * This method demonstrates withlatestfrom functionality
   * @remarks
   * withlatestfrom triggers/subscribes first once the source and slave obs emit after that triggers/subscribes only after the source emits.
   * @returns void
   */
  demowithLatestFrom(): void {
    let id1, id2;
    const data1 = defer(() => (this.http.get(`${newurl}/${id1}`)));
    const data2 = defer(() => (this.http.get(`${users}/${id2}`)));
    const id1obs = interval(200).pipe(take(5));//0,1,2,3,4 => 1,2,3,4,5
    const id2obs = interval(500).pipe(take(3));//0,1,2 => 1,2,3

    id1obs.pipe(withLatestFrom(id2obs))
      .pipe(
        concatMap(([d1, d2]) => {
          id1 = d1 + 1;
          id2 = d2 + 1;
          return zip(data1, data2)
        })
      )
      .subscribe(([res1, res2]) => {
        console.log('withlatestfrom operator', res1, res2);
      })
  }
  /**
   * This method demonstrates forkjoin functionality
   * @remarks
   * ForkJoin triggers/subscribes once all observables have completed.
   * @returns void
   */
  demoForkJoin(): void {
    let id1, id2;
    const data1 = defer(() => (this.http.get(`${newurl}/${id1}`)));
    const data2 = defer(() => (this.http.get(`${users}/${id2}`)));
    const id1obs = interval(200).pipe(take(3));
    const id2obs = interval(500).pipe(take(2));
    forkJoin([id1obs, id2obs])
      .pipe(
        concatMap(([d1, d2]) => {
          id1 = d1 + 1;
          id2 = d2 + 2;
          return zip(data1, data2)
        })
      )
      .subscribe(([res1, res2]) => {
        console.log('forkjoin operator', res1, res2);
      })
  }
  /**
   * This method demonstrates race functionality
   * @remarks
   * Race triggers/subscribes the first observable that emits.
   * @returns void
   */
  demoRace(): void {
    const api1 = this.http.get(`${newurl}/1`).pipe(delay(300));
    const api2 = this.http.get(`${newurl}/2`).pipe(delay(500));
    race(api1, api2)
      .subscribe((res: any) => {
        console.log('race operator', res.data.id, res);
      })
  }
  /**
   * This method demonstrates subject functionality
   * @remarks
   * Subject allows values to be multicasted values to many observers.
   * @returns void
   */
  demoSubject(): void {
    this.http.get(`${newurl}`)
      .subscribe(
        (res: any) => {
          this.sharedserv.sub.next(res.data);
        }
      );
    this.sharedserv.sub
      .subscribe(data => console.log('subject', data));
  }
  /**
   * This method demonstrates behaviorsubject functionality
   * @remarks
   * Behavior is same as Subject but here we can define an initial value.
   * @returns void
   */
  demoBehaviorSubject(): void {
    this.http.get(`${newurl}`)
      .subscribe(
        (res: any) => {
          this.sharedserv.bsub.next(res.data);
        }
      );
    this.sharedserv.bsub
      .subscribe(data => console.log('behavior subject', data));
  }
  /**
   * This method demonstrates tap functionality
   * @remarks
   * Tap is used to create side-effect from any observable/typically used to store data at some other place before it gets manipulated.
   * @returns void
   */
  demoTap(): void {
    this.http.get(`${newurl}`)
      .pipe(
        tap((res: any) => this.sharedserv.bsub.next(res.data)),
        switchMap((res: any) => this.http.get(`${newurl}/${res.total_pages}`))
      )
      .subscribe(res => {
        console.log('tap demo');
        this.sharedserv.sub.next(res);
      })
  }
  /**
   * This method demonstrates take functionality
   * @remarks
   * Take only takes the specified value.
   * @returns void
   */
  demoTake(): void {
    const id = interval(20).pipe(take(2));
    this.subs.sink = id.pipe(
      mergeMap((res) => this.http.get(`${users}/${res + 1}`))
    )
      .subscribe(res => {
        console.log('demotake', res);
      })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  callFunction(functionToCall): void {
    
    if(functionToCall === 'demoSwitchMap' || functionToCall === 'demoMergeMap'){
      this[functionToCall](this.id);
    }
    else{
      this[functionToCall]();
    }
  }

}

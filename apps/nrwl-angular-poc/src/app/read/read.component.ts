import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Tutorial } from '../../model/tutorial.model';
import { RemoveTutorial } from '../../actions/tutorial.actions';
import { TutorialState } from '../../state/tutorial.state';

@Component({
  selector: 'nrwl-poc-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

   @Select(TutorialState.getTutorials) tutorials$: Observable<Tutorial[]>;

  // tutorials$: Observable<Tutorial>
  
  constructor(private store: Store) {
      // this.tutorials$ = this.store.select(state => state.tutorials.tutorials)
  }

  delTutorial(name) {
    this.store.dispatch(new RemoveTutorial(name))
  }
  ngOnInit(): void {
  }

}

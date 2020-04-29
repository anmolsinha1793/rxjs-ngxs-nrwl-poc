import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RemoveTutorial } from '../../actions/tutorial.actions';

@Component({
  selector: 'nrwl-poc-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(private store: Store) { }

  removeTutorial(name) {
    this.store.dispatch(new RemoveTutorial(name));
  }

  ngOnInit(): void {
  }

}

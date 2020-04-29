import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddTutorial } from '../../actions/tutorial.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'nrwl-poc-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  myForm: FormGroup;
  constructor(private store: Store, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required]
    });

  }
  clearForm() {
    this.myForm.reset();
  }
  onSubmit() {
    // this.store.dispatch(new AddTutorial({ name: name, url: url }))
    this.store.dispatch(new AddTutorial(this.myForm.value));
    this.clearForm();
}

}

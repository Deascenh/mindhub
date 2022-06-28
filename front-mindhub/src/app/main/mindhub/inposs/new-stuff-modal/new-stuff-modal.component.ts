import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Stuff } from '../models';

@Component({
  selector: 'app-new-stuff-modal',
  templateUrl: './new-stuff-modal.component.html',
  styleUrls: ['./new-stuff-modal.component.scss'],
})
export class NewStuffModalComponent {

  stuff: Stuff = new Stuff();

  constructor(private activeModal: NgbActiveModal) {
  }

  dismiss() {
    this.activeModal.dismiss('nothing');
  }

  submit() {
    this.activeModal.close(this.stuff);
  }
}

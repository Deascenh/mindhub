import { Component, Input, OnInit } from '@angular/core';

import { ProcupoService } from '../../procupo.service';
import { Procupo } from '../../procupo.model';

@Component({
  selector: 'app-procupo-list-item',
  templateUrl: './procupo-list-item.component.html'
})
export class ProcupoListItemComponent implements OnInit {
  // Input Decorator
  @Input() todo: Procupo;

  // Public
  public selected;

  /**
   * Constructor
   *
   * @param {ProcupoService} _procupoService
   */
  constructor(private _procupoService: ProcupoService) {}

  /**
   *
   * @param stateRef
   */
  checkboxStateChange(stateRef) {
    this.todo.completed = stateRef;
    this._procupoService.updateCurrentTodo(this.todo);
  }

  ngOnInit(): void {}
}

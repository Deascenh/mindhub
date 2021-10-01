import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { ProcupoService } from '../procupo.service';
import { Procupo } from '../procupo.model';

@Component({
  selector: 'app-procupo-list',
  templateUrl: './procupo-list.component.html'
})
export class ProcupoListComponent implements OnInit {
  // Public
  public todos: Procupo[];

  /**
   * Constructor
   *
   * @param {ProcupoService} _procupoService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _dragulaService: DragulaService,
    private _procupoService: ProcupoService,
    private _coreSidebarService: CoreSidebarService
  ) {
    // Drag And Drop With Handle
    _dragulaService.destroy('todo-tasks-drag-area');
    _dragulaService.createGroup('todo-tasks-drag-area', {
      moves: function (el, container, handle) {
        return handle.classList.contains('drag-icon');
      }
    });
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Sidebar
   *
   * @param nameRef
   */
  toggleSidebar(nameRef): void {
    this._coreSidebarService.getSidebarRegistry(nameRef).toggleOpen();
  }

  /**
   * Update Sort
   *
   * @param sortRef
   */
  updateSort(sortRef) {
    this._procupoService.sortTodos(sortRef);
  }

  /**
   * Update Query
   *
   * @param queryRef
   */
  updateQuery(queryRef) {
    this._procupoService.getTodosBySearch(queryRef.target.value);
  }

  /**
   * Open Todo
   *
   * @param idRef
   */
  openTodo(idRef) {
    this._procupoService.setCurrentTodo(idRef);
    this._coreSidebarService.getSidebarRegistry('todo-sidebar-right').toggleOpen();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe Todos change
    this._procupoService.onTodoDataChange.subscribe(response => (this.todos = response));
  }
}

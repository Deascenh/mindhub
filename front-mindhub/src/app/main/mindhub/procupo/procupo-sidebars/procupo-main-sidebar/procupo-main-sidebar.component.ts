import { Component, OnInit } from '@angular/core';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { ProcupoService } from '../../procupo.service';

@Component({
  selector: 'app-procupo-main-sidebar',
  templateUrl: './procupo-main-sidebar.component.html'
})
export class ProcupoMainSidebarComponent implements OnInit {
  // Public
  public filters: Array<{}>;
  public tags: Array<{}>;

  /**
   * Constructor
   *
   * @param {ProcupoService} _procupoService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private _procupoService: ProcupoService) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Sidebar
   *
   * @param nameRef
   */
  createNewTodo(nameRef, closeNameRef): void {
    this._coreSidebarService.getSidebarRegistry(nameRef).toggleOpen();
    this._coreSidebarService.getSidebarRegistry(closeNameRef).toggleOpen();
    this._procupoService.createNewTodo();
  }

  /**
   * Toggle Sidebar
   *
   * @param nameRef
   */
  toggleSidebar(nameRef): void {
    this._coreSidebarService.getSidebarRegistry(nameRef).toggleOpen();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._procupoService.onFiltersChange.subscribe(response => (this.filters = response));
    this._procupoService.onTagsChange.subscribe(response => (this.tags = response));
  }
}

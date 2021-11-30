import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { TempogrammeService } from '../../services/tempogramme.service';

@Component({
  selector: 'app-tempogramme-main-sidebar',
  templateUrl: './tempogramme-main-sidebar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TempogrammeMainSidebarComponent implements OnInit {
  // Public
  public categories = [];
  public tempRef = [];
  public checkAll = true;

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {TempogrammeService} _tempogrammeService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private _tempogrammeService: TempogrammeService) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Event Sidebar
   */
  toggleEventSidebar() {
    this._coreSidebarService.getSidebarRegistry('tempogramme-event-sidebar').toggleOpen();
  }

  /**
   * Add Event
   *
   */
  AddEvent() {
    this.toggleEventSidebar();
    this._coreSidebarService.getSidebarRegistry('calendar-main-sidebar').toggleOpen();
    this._tempogrammeService.createNewEvent();
  }

  /**
   * If all checkbox are checked : returns TRUE
   */
  allChecked() {
    return this.categories.every(v => v.checked === true);
  }

  /**
   * Checkbox Change
   *
   * @param event
   * @param id
   */
  checkboxChange(event, id) {
    const index = this.categories.findIndex(r => {
      if (r.id === id) {
        return id;
      }
    });
    this.categories[index].checked = event.target.checked;
    this._tempogrammeService.calendarUpdate(this.categories);
    this.checkAll = this.allChecked();
  }

  /**
   * Toggle All Checkbox
   *
   * @param event
   */
  toggleCheckboxAll(event) {
    this.checkAll = event.target.checked;
    if (this.checkAll) {
      this.categories.map(res => {
        res.checked = true;
      });
    } else {
      this.categories.map(res => {
        res.checked = false;
      });
    }
    this._tempogrammeService.calendarUpdate(this.categories);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to Calendar changes
    this._tempogrammeService.onCalendarChange.subscribe(res => {
      this.categories = res;
    });
  }
}

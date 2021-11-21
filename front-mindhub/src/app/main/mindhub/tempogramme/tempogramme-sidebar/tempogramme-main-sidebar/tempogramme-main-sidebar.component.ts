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
  public calendarRef = [];
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
    this._coreSidebarService.getSidebarRegistry('calendar-event-sidebar').toggleOpen();
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
    return this.calendarRef.every(v => v.checked === true);
  }

  /**
   * Checkbox Change
   *
   * @param event
   * @param id
   */
  checkboxChange(event, id) {
    const index = this.calendarRef.findIndex(r => {
      if (r.id === id) {
        return id;
      }
    });
    this.calendarRef[index].checked = event.target.checked;
    this._tempogrammeService.calendarUpdate(this.calendarRef);
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
      this.calendarRef.map(res => {
        res.checked = true;
      });
    } else {
      this.calendarRef.map(res => {
        res.checked = false;
      });
    }
    this._tempogrammeService.calendarUpdate(this.calendarRef);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to Calendar changes
    this._tempogrammeService.onCalendarChange.subscribe(res => {
      this.calendarRef = res;
    });
  }
}

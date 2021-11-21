import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { EventRef } from 'app/main/apps/calendar/calendar.model';
import { TempogrammeService } from '../../services/tempogramme.service';
import { French } from "flatpickr/dist/l10n/fr"

@Component({
  selector: 'app-tempogramme-event-sidebar',
  templateUrl: './tempogramme-event-sidebar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TempogrammeEventSidebarComponent implements OnInit {
  //  Decorator
  @ViewChild('startDatePicker') startDatePicker;
  @ViewChild('endDatePicker') endDatePicker;

  // Public
  public event: EventRef;
  public isDataEmpty;
  public selectLabel = [
    { label: 'Professionnel', bullet: 'danger' },
    { label: 'Social', bullet: 'primary' },
    { label: 'Personnel', bullet: 'success' },
    { label: 'Famille', bullet: 'warning' },
    { label: 'A faire', bullet: 'info' }
  ];
  public selectGuest = [
    { name: 'Jane Foster', avatar: 'assets/images/avatars/1-small.png' },
    { name: 'Donna Frank', avatar: 'assets/images/avatars/3-small.png' },
    { name: 'Gabrielle Robertson', avatar: 'assets/images/avatars/5-small.png' },
    { name: 'Lori Spears', avatar: 'assets/images/avatars/7-small.png' },
    { name: 'Sandy Vega', avatar: 'assets/images/avatars/9-small.png' },
    { name: 'Cheryl May', avatar: 'assets/images/avatars/11-small.png' }
  ];
  public startDateOptions = {
    altInput: true,
    locale: French,
    altFormat: 'D j F Y, à H\\hi',
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: true
  };
  public endDateOptions = {
    altInput: true,
    locale: French,
    altFormat: 'D j F Y, à H\\hi',
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    enableTime: true
  };

  /**
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
   * @param eventForm
   */
  addEvent(eventForm) {
    if (eventForm.valid) {
      //! Fix: Temp fix till ng2-flatpicker support ng-modal (Getting NG0100: Expression has changed after it was checked error if we use ng-model with ng2-flatpicker)
      eventForm.form.value.start = this.startDatePicker.flatpickrElement.nativeElement.children[0].value;
      eventForm.form.value.end = this.endDatePicker.flatpickrElement.nativeElement.children[0].value;

      this._tempogrammeService.addEvent(eventForm.form.value);
      this.toggleEventSidebar();
    }
  }

  /**
   * Update Event
   */
  updateEvent() {
    this.toggleEventSidebar();
    //! Fix: Temp fix till ng2-flatpicker support ng-modal
    this.event.start = this.startDatePicker.flatpickrElement.nativeElement.children[0].value;
    this.event.end = this.endDatePicker.flatpickrElement.nativeElement.children[0].value;
    this._tempogrammeService.postUpdatedEvent(this.event);
  }

  /**
   * Delete Event
   */
  deleteEvent() {
    this._tempogrammeService.deleteEvent(this.event);
    this.toggleEventSidebar();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to current event changes
    this._tempogrammeService.onCurrentEventChange.subscribe(response => {
      console.log(response)
      this.event = response;

      // If Event is available
      if (Object.keys(response).length > 0) {
        this.event = response;
        this.isDataEmpty = false;
        if (response.id === undefined) {
          this.isDataEmpty = true;
        }
      }
      // else Create New Event
      else {
        this.event = new EventRef();

        // Clear Flatpicker Values
        setTimeout(() => {
          this.startDatePicker.flatpickr.clear();
          this.endDatePicker.flatpickr.clear();
        });
        this.isDataEmpty = true;
      }
    });
  }
}

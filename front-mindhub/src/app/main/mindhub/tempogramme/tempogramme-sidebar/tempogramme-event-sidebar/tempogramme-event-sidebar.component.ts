import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { TempogrammeService } from '../../services/tempogramme.service';
import { French } from "flatpickr/dist/l10n/fr"
import { Event, EventCategory } from '../../models';
import { EventCategoryDataService } from '../../services/data/event-category-data.service';
import { Person } from '../../../persona/models';
import { PersonDataService } from '../../../persona/services/data/person-data.service';

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
  public event: Event;
  public isDataEmpty;
  public categoriesList: EventCategory[] = [];
  public peopleList: Person[] = [];
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
   * @param {CoreSidebarService} _coreSidebarService
   * @param {TempogrammeService} _tempogrammeService
   * @param {EventCategoryDataService} eventCategoryData
   * @param {PersonDataService} personData
   */
  constructor(private _coreSidebarService: CoreSidebarService,
              private _tempogrammeService: TempogrammeService,
              private eventCategoryData: EventCategoryDataService,
              private personData: PersonDataService,
  ) { }

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
    console.log(eventForm);
    console.log(eventForm.valid);
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
    this.eventCategoryData.getAll().subscribe(categories => this.categoriesList = categories['hydra:member']);
    this.personData.getAll().subscribe(people => this.peopleList = people['hydra:member']);
    // Subscribe to current event changes
    this._tempogrammeService.onCurrentEventChange.subscribe(response => {
      console.log('onCurrentEventChange', response)
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
        this.event = new Event();

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

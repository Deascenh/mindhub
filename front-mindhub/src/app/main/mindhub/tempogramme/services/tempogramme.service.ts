import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { Event, EventCategory } from '../models';
import { EventDataService } from './data/event-data.service';
import { EventCategoryDataService } from './data/event-category-data.service';

@Injectable()
export class TempogrammeService implements Resolve<any> {
  // Public
  public events: Event[];
  public categories: EventCategory[];
  public currentEvent;
  public tempEvents;

  public onEventChange: BehaviorSubject<any>;
  public onCurrentEventChange: BehaviorSubject<any>;
  public onCalendarChange: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {EventDataService} eventData
   * @param {EventCategoryDataService} eventCategoryData
   */
  constructor(
    private _httpClient: HttpClient,
    private eventData: EventDataService,
    private eventCategoryData: EventCategoryDataService,
  ) {
    this.onEventChange = new BehaviorSubject({});
    this.onCurrentEventChange = new BehaviorSubject({});
    this.onCalendarChange = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getEvents(), this.getCalendar()]).then(res => {
        resolve(res);
      }, reject);
    });
  }

  /**
   * Get Events
   */
  getEvents() {
    return new Promise((resolve, reject) => {
      this.eventData.getAll().subscribe(data => {
        this.events = data['hydra:member'];
        this.tempEvents = data['hydra:member'];
        this.onEventChange.next(this.events);
        resolve(this.events);
      }, reject);
    });
  }

  /**
   * Get Calendar
   */
  getCalendar() {
    return new Promise((resolve, reject) => {
      this.eventCategoryData.getAll().subscribe(resp => {
        this.categories = resp['hydra:member'];
        this.onCalendarChange.next(this.categories);
        resolve(this.categories);
      }, reject);
    });
  }

  /**
   * Create New Event
   */
  createNewEvent() {
    this.currentEvent = {};
    this.onCurrentEventChange.next(this.currentEvent);
  }

  /**
   * Calendar Update
   *
   * @param calendars
   */
  calendarUpdate(calendars) {
    const calendarsChecked = calendars.filter(calendar => {
      return calendar.checked === true;
    });

    let calendarRef = [];
    calendarsChecked.map(res => {
      calendarRef.push(res.filter);
    });

    this.events = this.tempEvents.filter(event => calendarRef.includes(event.calendar));
    this.onEventChange.next(this.events);
  }

  /**
   * Delete Event
   *
   * @param event
   */
  deleteEvent(event) {
    return new Promise((resolve, reject) => {
      this.eventData.delete(event).subscribe((resp) => {
        this.getEvents();
        resolve(resp);
    }, reject);
  });
  }

  /**
   * Add Event
   *
   * @param eventForm
   */
  addEvent(eventForm) {
    const newEvent = new Event();
    newEvent.url = eventForm.url;
    newEvent.title = eventForm.title;
    newEvent.start = eventForm.start;
    newEvent.end = eventForm.end;
    newEvent.allDay = eventForm.allDay;
    newEvent.category = eventForm.category['@id'];
    newEvent.people = eventForm.people.map(p => p['@id']);
    this.currentEvent = newEvent;
    this.onCurrentEventChange.next(this.currentEvent);
    this.eventData.save(newEvent).subscribe();
  }

  /**
   * Update Event
   *
   * @param eventRef
   */
  updateCurrentEvent(eventRef) {
    const newEvent = new Event();
    newEvent.allDay = eventRef.event.allDay;
    newEvent.id = eventRef.event.id;
    newEvent.url = eventRef.event.url;
    newEvent.title = eventRef.event.title;
    newEvent.start = eventRef.event.start;
    newEvent.end = eventRef.event.end;
    newEvent.category = eventRef.category['@id'];
    newEvent.people = eventRef.people.map(p => p['@id']);
    this.currentEvent = newEvent;
    this.onCurrentEventChange.next(this.currentEvent);
  }


  /**
   * Post Updated Event
   *
   * @param event
   */
  postUpdatedEvent(event) {
    console.log('Go post !');
    return new Promise((resolve, reject) => {
      this.eventData.save(new Event(event)).subscribe(resp => {
        this.getEvents();
        resolve(resp);
      }, reject);
    });
  }
}

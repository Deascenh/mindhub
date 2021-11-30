import { EventCategory } from './event-category.model';
import { Person } from '../../persona/models';

export class Event {
  id?: string = undefined;
  url?: string;
  title: string = null;
  description: string = null;
  location: string = null;
  startTime: string;
  endTime: string;
  allDay: boolean = false;
  category: string | Partial<EventCategory> | EventCategory;
  people: Person[] = [];

  /**
   * Fullcalendar specific Properties
   */
  start: string;
  end: string;
  calendar: string; // From EventCategory.name

  constructor(props?: object & any) {
    Object.assign(this, props);

    if (this.url === null) {
      delete this.url;
    }

    if (typeof props === 'object') {
      if (props.hasOwnProperty('startTime')) {
        this.start = props.startTime;
      }

      if (props.hasOwnProperty('endTime')) {
        this.end = props.endTime;
      }

      if (props.hasOwnProperty('start')) {
        this.startTime = props.start;
      }

      if (props.hasOwnProperty('end')) {
        this.endTime = props.end;
      }

      if (props.hasOwnProperty('category') && props.category.hasOwnProperty('@id')) {
        this.category = new EventCategory(props.category);
        this.calendar = this.category.name;
      }
    }
  }
}

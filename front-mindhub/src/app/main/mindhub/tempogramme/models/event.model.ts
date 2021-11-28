import { EventCategory } from './event-category.model';
import { Person } from '../../persona/models';

export class Event {
  id?: string = undefined;
  title: string = null;
  description: string = null;
  location: string = null;
  url: string = null;
  start: string;
  startTime: string;
  end: string;
  endTime: string;
  allDay: boolean = false;
  category: string | Partial<EventCategory> | EventCategory;
  people: Person[] = [];

  constructor(props?: object & any) {
    Object.assign(this, props);

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
    }
  }
}

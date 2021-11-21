import { EventCategory } from './event-category.model';

export class Event {
  id?: string = undefined;
  title: string = null;
  description: string = null;
  location: string = null;
  url: string = null;
  start: string;
  end: string;
  allDay: boolean = false;
  category: string | Partial<EventCategory> | EventCategory;
  persons: [];

  constructor(props?: object) {
    Object.assign(this, props);
  }
}

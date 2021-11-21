export class EventCategory {
  id?: string = undefined;
  name: string;
  color: string;
  checked: string;

  constructor(props?: object) {
    Object.assign(this, props);
  }
}

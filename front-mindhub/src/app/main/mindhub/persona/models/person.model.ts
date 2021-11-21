export class Person {
  id?: string = undefined;
  firstName: string = null;
  lastName: string = null;
  avatar: string = null;

  constructor(props?: object) {
    Object.assign(this, props);
  }
}

export class Stuff {
  id?: string = undefined;
  name: string;

  constructor(props?: object & any) {
    Object.assign(this, props);
  }
}

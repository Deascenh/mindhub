export class StuffType {
  id?: string = undefined;
  name: string;

  constructor(props?: object) {
    Object.assign(this, props);
  }
}

import { Stuff } from './stuff.model';

export class StuffIllustration {
  id?: string = undefined;
  main: boolean = false;
  stuff: Stuff = null;
  file: any;

  constructor(props?: object) {
    Object.assign(this, props);
  }
}

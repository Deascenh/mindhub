import { StuffType } from './stuff-type.model';
import { StuffIllustration } from './stuff-illustration.model';

export class Stuff {
  id?: string = undefined;
  name: string;
  price: number;
  estimatedPrice: number;
  priceEstimatedAt: string|Date;
  obtainedAt: string|Date;
  obtainingMethod: string;
  types: string[]|StuffType[] = [];
  illustrations: string[]|StuffIllustration[] = [];

  constructor(props?: object & any) {
    Object.assign(this, props);
  }
}

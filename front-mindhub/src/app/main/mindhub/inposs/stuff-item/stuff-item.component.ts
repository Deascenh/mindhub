import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';

import { InpossService } from '../services/inposs.service';
import { Stuff, StuffIllustration } from '../models';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-stuff-item',
  templateUrl: './stuff-item.component.html',
  styleUrls: ['./stuff-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class StuffItemComponent implements OnChanges {
  @Input() stuff;
  @Input() isWishlistOpen = false;

  isInCart = false;
  mainIllustrationUrl: string = null;

  /**
   * @param {InpossService} inpossService
   */
  constructor(private inpossService: InpossService) {}

  ngOnChanges(): void {
    if (this.stuff instanceof Stuff) {
      this.fetchAnIllustration();
    }
  }

  private fetchAnIllustration() {
    if (this.stuff.illustrations.length > 0) {
      const stuffIllustrations = this.stuff.illustrations as StuffIllustration[];
      let mainIllustration = stuffIllustrations.filter((si: StuffIllustration) => si.main)[0];

      if (!!!mainIllustration) {
        mainIllustration = stuffIllustrations[0];
      }

      this.mainIllustrationUrl = environment.mindhub_api_url + mainIllustration.contentUrl;
    }
  }
}

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { InpossService } from '../services/inposs.service';

@Component({
  selector: 'app-stuff-item',
  templateUrl: './stuff-item.component.html',
  styleUrls: ['./stuff-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class StuffItemComponent implements OnInit {
  // Input Decorotor
  @Input() stuff;
  @Input() isWishlistOpen = false;

  // Public
  public isInCart = false;

  /**
   * @param {InpossService} inpossService
   */
  constructor(private inpossService: InpossService) {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {}
}

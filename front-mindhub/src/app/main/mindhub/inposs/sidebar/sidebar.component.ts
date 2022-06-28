import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'stuff-filter-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../inposs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StuffFilterSidebarComponent implements OnInit {
  // Public
  public sliderPriceValue = [1, 100];

  constructor() {}

  ngOnInit(): void {}
}

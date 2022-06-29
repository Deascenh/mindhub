import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '../../../../@core/components/core-sidebar/core-sidebar.service';
import { InpossService } from './services/inposs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewStuffModalComponent } from './new-stuff-modal/new-stuff-modal.component';
import { Stuff } from './models';

@Component({
  selector: 'app-inposs',
  templateUrl: './inposs.component.html',
  styleUrls: ['./inposs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class InpossComponent  implements OnInit {
  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = true;
  public stuffs;
  public page = 1;
  public pageSize = 9;
  public searchText = '';

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {InpossService} inpossService
   * @param {NgbModal} _modalService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private inpossService: InpossService,
    private _modalService: NgbModal,
  ) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Update to List View
   */
  listView() {
    this.gridViewRef = false;
  }

  /**
   * Update to Grid View
   */
  gridView() {
    this.gridViewRef = true;
  }

  /**
   * Sort Stuff
   */
  sortStuff(sortParam) {
    this.inpossService.sortStuff(sortParam);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.inpossService.onStuffListChange.subscribe(res => {
      this.stuffs = res;
    });
  }

  openNewStuffModal() {
    const options = {
      centered: true,
      size: 'lg'
    };
    const modalRef = this._modalService.open(NewStuffModalComponent, options);

    modalRef.result.then((r) => {
      if (r instanceof Stuff) {
        this.inpossService.getStuffs();
      }
    }).catch(() => {});
  }
}

import { Component, Inject, OnDestroy, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as Waves from 'node-waves';

import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { CoreLoadingScreenService } from '@core/services/loading-screen.service';

import { menu } from 'app/menu/menu';
import { AuthenticationService } from './auth/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  coreConfig: any;
  menu: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {DOCUMENT} document
   * @param {Title} _title
   * @param {Renderer2} _renderer
   * @param {ElementRef} _elementRef
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CoreLoadingScreenService} _coreLoadingScreenService
   * @param {CoreMenuService} _coreMenuService
   * @param _authService
   */
  constructor(
    @Inject(DOCUMENT) private document: any,
    private _title: Title,
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    public _coreConfigService: CoreConfigService,
    private _coreSidebarService: CoreSidebarService,
    private _coreLoadingScreenService: CoreLoadingScreenService,
    private _coreMenuService: CoreMenuService,
    private _authService: AuthenticationService,
  ) {
    this._authService.login('admin@demo.com', 'admin').subscribe();
    // Get the application main menu
    this.menu = menu;

    // Register the menu to the menu service
    this._coreMenuService.register('main', this.menu);

    // Set the main menu as our current menu
    this._coreMenuService.setCurrentMenu('main');

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Init wave effect (Ripple effect)
    Waves.init();

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;

      // Layout
      //--------

      // Remove default classes first
      this._elementRef.nativeElement.classList.remove(
        'vertical-layout',
        'vertical-menu-modern',
        'horizontal-layout',
        'horizontal-menu'
      );
      // Add class based on config options
      if (this.coreConfig.layout.type === 'vertical') {
        this._elementRef.nativeElement.classList.add('vertical-layout', 'vertical-menu-modern');
      } else if (this.coreConfig.layout.type === 'horizontal') {
        this._elementRef.nativeElement.classList.add('horizontal-layout', 'horizontal-menu');
      }

      // Navbar
      //--------

      // Remove default classes first
      this._elementRef.nativeElement.classList.remove(
        'navbar-floating',
        'navbar-static',
        'navbar-sticky',
        'navbar-hidden'
      );

      // Add class based on config options
      if (this.coreConfig.layout.navbar.type === 'navbar-static-top') {
        this._elementRef.nativeElement.classList.add('navbar-static');
      } else if (this.coreConfig.layout.navbar.type === 'fixed-top') {
        this._elementRef.nativeElement.classList.add('navbar-sticky');
      } else if (this.coreConfig.layout.navbar.type === 'floating-nav') {
        this._elementRef.nativeElement.classList.add('navbar-floating');
      } else {
        this._elementRef.nativeElement.classList.add('navbar-hidden');
      }

      // Footer
      //--------

      // Remove default classes first
      this._elementRef.nativeElement.classList.remove('footer-fixed', 'footer-static', 'footer-hidden');

      // Add class based on config options
      if (this.coreConfig.layout.footer.type === 'footer-sticky') {
        this._elementRef.nativeElement.classList.add('footer-fixed');
      } else if (this.coreConfig.layout.footer.type === 'footer-static') {
        this._elementRef.nativeElement.classList.add('footer-static');
      } else {
        this._elementRef.nativeElement.classList.add('footer-hidden');
      }

      // Blank layout
      if (
        this.coreConfig.layout.menu.hidden &&
        this.coreConfig.layout.navbar.hidden &&
        this.coreConfig.layout.footer.hidden
      ) {
        this._elementRef.nativeElement.classList.add('blank-page');
        // ! Fix: Transition issue while coming from blank page
        this._renderer.setAttribute(
          this._elementRef.nativeElement.getElementsByClassName('app-content')[0],
          'style',
          'transition:none'
        );
      } else {
        this._elementRef.nativeElement.classList.remove('blank-page');
        // ! Fix: Transition issue while coming from blank page
        setTimeout(() => {
          this._renderer.setAttribute(
            this._elementRef.nativeElement.getElementsByClassName('app-content')[0],
            'style',
            'transition:300ms ease all'
          );
        }, 0);
        // If navbar hidden
        if (this.coreConfig.layout.navbar.hidden) {
          this._elementRef.nativeElement.classList.add('navbar-hidden');
        }
        // Menu (Vertical menu hidden)
        if (this.coreConfig.layout.menu.hidden) {
          this._renderer.setAttribute(this._elementRef.nativeElement, 'data-col', '1-column');
        } else {
          this._renderer.removeAttribute(this._elementRef.nativeElement, 'data-col');
        }
        // Footer
        if (this.coreConfig.layout.footer.hidden) {
          this._elementRef.nativeElement.classList.add('footer-hidden');
        }
      }

      // Skin Class (Adding to body as it requires highest priority)
      if (this.coreConfig.layout.skin !== '' && this.coreConfig.layout.skin !== undefined) {
        this.document.body.classList.remove('default-layout', 'bordered-layout', 'dark-layout', 'semi-dark-layout');
        this.document.body.classList.add(this.coreConfig.layout.skin + '-layout');
      }
    });

    // Set the application page title
    this._title.setTitle(this.coreConfig.app.appTitle);
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }
}

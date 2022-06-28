import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';
import { InpossComponent } from './inposs.component';
import { StuffFilterSidebarComponent } from './sidebar/sidebar.component';
import { CoreSidebarModule } from '../../../../@core/components';
import { StuffItemComponent } from './stuff-item/stuff-item.component';
import { NouisliderModule } from 'ng2-nouislider';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { CoreTouchspinModule } from '../../../../@core/components/core-touchspin/core-touchspin.module';
import { InpossService } from './services/inposs.service';
import { ContentHeaderModule } from '../../../layout/components/content-header/content-header.module';
import { NewStuffModalComponent } from './new-stuff-modal/new-stuff-modal.component';
import { WebcamModule } from 'ngx-webcam';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true,
  slidesPerView: 'auto'
};

// routing
const routes: Routes = [
  {
    path: '**',
    component: InpossComponent,
    resolve: {
      inposs: InpossService,
    },
    data: { animation: 'dinposs' }
  }
];

@NgModule({
  declarations: [
    InpossComponent,
    StuffFilterSidebarComponent,
    StuffItemComponent,
    NewStuffModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCommonModule,
    NgbModule,
    NouisliderModule,
    NgbModalModule,
    WebcamModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    NgbActiveModal,
  ],
})
export class InpossModule {}

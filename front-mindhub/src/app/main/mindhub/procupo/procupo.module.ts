import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragulaModule } from 'ng2-dragula';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';

import { CoreSidebarModule } from '@core/components';
import { CoreCommonModule } from '@core/common.module';

import { ProcupoListComponent } from './procupo-list/procupo-list.component';
import { ProcupoListItemComponent } from './procupo-list/procupo-list-item/procupo-list-item.component';
import { ProcupoMainSidebarComponent } from './procupo-sidebars/procupo-main-sidebar/procupo-main-sidebar.component';
import { ProcupoService } from './procupo.service';
import { ProcupoComponent } from './procupo.component';
import { ProcupoRightSidebarComponent } from './procupo-sidebars/procupo-right-sidebar/procupo-right-sidebar.component';

// routing
const routes: Routes = [
  {
    path: ':filter',
    component: ProcupoComponent,
    resolve: {
      data: ProcupoService
    }
  },
  {
    path: 'tag/:tag',
    component: ProcupoComponent,
    resolve: {
      data: ProcupoService
    }
  },
  {
    path: '**',
    redirectTo: 'all',
    data: { animation: 'todo' }
  }
];

@NgModule({
  declarations: [
    ProcupoComponent,
    ProcupoListComponent,
    ProcupoMainSidebarComponent,
    ProcupoRightSidebarComponent,
    ProcupoListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreSidebarModule,
    QuillModule.forRoot(),
    NgSelectModule,
    DragulaModule.forRoot(),
    NgbModule,
    Ng2FlatpickrModule,
    PerfectScrollbarModule
  ],
  providers: [ProcupoService]
})
export class ProcupoModule {}

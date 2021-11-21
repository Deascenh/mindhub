import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { TempogrammeComponent } from './tempogramme.component';
import { TempogrammeEventSidebarComponent } from './tempogramme-sidebar/tempogramme-event-sidebar/tempogramme-event-sidebar.component';
import { TempogrammeMainSidebarComponent } from './tempogramme-sidebar/tempogramme-main-sidebar/tempogramme-main-sidebar.component';
import { TempogrammeService } from './services/tempogramme.service';

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

// routing
const routes: Routes = [
  {
    path: '**',
    component: TempogrammeComponent,
    resolve: {
      data: TempogrammeService
    },
    data: { animation: 'dtempogramme' }
  }
];

@NgModule({
  declarations: [
    TempogrammeComponent,
    TempogrammeEventSidebarComponent,
    TempogrammeMainSidebarComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreSidebarModule,
    FormsModule,
    Ng2FlatpickrModule,
    NgSelectModule,
    NgbModule
  ],
  providers: [TempogrammeService]
})
export class TempogrammeModule {}

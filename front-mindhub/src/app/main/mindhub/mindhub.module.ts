import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// routing
const routes: Routes = [
  {
    path: 'procupo',
    loadChildren: () => import('./procupo/procupo.module').then(m => m.ProcupoModule)
  },
  {
    path: 'tempogramme',
    loadChildren: () => import('./tempogramme/tempogramme.module').then(m => m.TempogrammeModule)
  },
  {
    path: 'inposs',
    loadChildren: () => import('./inposs/inposs.module').then(m => m.InpossModule)
  },
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class MindhubModule {}

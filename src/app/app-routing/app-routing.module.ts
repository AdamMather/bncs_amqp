import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Components
import { StoreComponent } from './../store/store.component';

// Resolve
import { PortalResolve } from '../shared/resolve/portal.resolve.service';

const routes: Routes = [
  { path: '', component: StoreComponent, resolve: { portal: PortalResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { StoreComponent } from './store/store.component';

// Imports
import { DraggableModule } from './draggable/draggable.module';

// Providers
import { Global } from './core/global';

// Core Service
import { PortalService } from './shared/service/portal.service';

// Core Resolve
import { PortalResolve } from './shared/resolve/portal.resolve.service';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDK8zuVo2bqA-K2PX08tcZUQgFmY5-fTHg'
    }),
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    DraggableModule
  ],
  providers: [Global, PortalService, PortalResolve ],
  bootstrap: [AppComponent]
})
export class AppModule { }

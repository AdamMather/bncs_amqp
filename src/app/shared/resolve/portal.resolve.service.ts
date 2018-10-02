import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, ErrorHandler } from '@angular/core';

import { Panel } from '../../core/panel.model';
import { PortalService } from '../../shared/service/portal.service';

@Injectable()
export class PortalResolve implements Resolve<Array<Panel>> {

        constructor(
        private errorHandler: ErrorHandler,
        private recordService: PortalService) { }

    resolve(route: ActivatedRouteSnapshot) {

        return this.recordService.getPanelData();

    }
}
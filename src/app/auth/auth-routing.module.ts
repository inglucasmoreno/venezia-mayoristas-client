import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../guards/login.guard';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';

// Componentes
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'login', canActivate: [ LoginGuard ], component: LoginComponent },
    { path: 'confirm/:id', canActivate: [ LoginGuard ], component: ConfirmacionComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}


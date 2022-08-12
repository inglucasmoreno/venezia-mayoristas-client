// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';


@NgModule({
  declarations: [
    LoginComponent,
    ConfirmacionComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule { }

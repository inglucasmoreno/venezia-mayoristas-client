import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DirectivesModule } from '../directives/directives.module';
import { PerfilComponent } from './perfil/perfil.component';
import { NuevoPedidoComponent } from './pedidos/nuevo-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';


@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    PerfilComponent,
    NuevoPedidoComponent,
    PedidosComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    DirectivesModule,
    SharedModule,
    PipesModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    DirectivesModule
  ]
})
export class PagesModule { }

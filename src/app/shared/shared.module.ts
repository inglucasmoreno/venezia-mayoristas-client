import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { StatebarComponent } from './statebar/statebar.component';
import { PipesModule } from '../pipes/pipes.module';
import { LoaderComponent } from './loader/loader.component';
import { ItemsComponent } from './header/components/items/items.component';
import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HeaderComponent,
    StatebarComponent,
    LoaderComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    HeaderComponent,
    ComponentsModule,
    StatebarComponent,
    LoaderComponent
  ]
})
export class SharedModule { }

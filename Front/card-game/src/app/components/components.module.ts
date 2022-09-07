
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';




@NgModule({
  declarations: [NavbarComponent, SideMenuComponent],
  imports: [
    CommonModule,
  ], exports: [ 
    NavbarComponent,
    SideMenuComponent
  ]
})
export class ComponentsModule { }

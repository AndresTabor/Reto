
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [NavbarComponent, SideMenuComponent, ModalComponent],
  imports: [
    CommonModule,
  ], exports: [ 
    NavbarComponent,
    SideMenuComponent,
    ModalComponent
  ]
})
export class ComponentsModule { }

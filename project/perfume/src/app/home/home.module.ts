import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {CartComponent} from './cart/cart.component';
import {BodyComponent} from './body/body.component';
import {DetailPerfumeComponent} from './detail-perfume/detail-perfume.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';


@NgModule({
  declarations: [CartComponent, BodyComponent, DetailPerfumeComponent, HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule {
}

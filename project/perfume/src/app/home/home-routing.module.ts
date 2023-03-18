import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BodyComponent} from './body/body.component';
import {CartComponent} from './cart/cart.component';
import {DetailPerfumeComponent} from './detail-perfume/detail-perfume.component';


const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'cart', component: CartComponent},
  {path: 'detail', component: DetailPerfumeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

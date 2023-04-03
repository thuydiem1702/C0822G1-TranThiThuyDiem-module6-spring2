import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BodyComponent} from './body/body.component';
import {CartComponent} from './cart/cart.component';
import {ProfileComponent} from './profile/profile.component';
import {DetailPerfumeComponent} from './detail-perfume/detail-perfume.component';
import {OderCreateComponent} from './cart/oder/oder-create/oder-create.component';


const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'cart', component: CartComponent},
  {path: 'home/:name', component: BodyComponent},
  {path: 'detail/:id', component: DetailPerfumeComponent},
  {path: 'oder/create', component: OderCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}

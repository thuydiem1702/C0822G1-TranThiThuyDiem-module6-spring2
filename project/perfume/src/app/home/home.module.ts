import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartComponent} from './cart/cart.component';
import {BodyComponent} from './body/body.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {RouterModule} from '@angular/router';
import { OderCreateComponent } from './cart/oder/oder-create/oder-create.component';


@NgModule({
  declarations: [CartComponent, BodyComponent, ProfileComponent],
  exports: [
    CartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule
  ]
})
export class HomeModule {
}

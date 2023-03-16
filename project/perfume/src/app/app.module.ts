import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { BodyComponent } from './home/body/body.component';
import { LoginComponent } from './login/login/login.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { DetailPerfumeComponent } from './detail-perfume/detail-perfume.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    LoginComponent,
    SignUpComponent,
    DetailPerfumeComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

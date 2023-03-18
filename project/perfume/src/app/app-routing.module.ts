import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './login/sign-up/sign-up.component';


const routes: Routes = [
  {path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)},
  {path: 'login', loadChildren: () => import('./login/login.module').then(module => module.LoginModule)},
  {path: 'login/signup', loadChildren: () => import('./login/login.module').then(module => SignUpComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

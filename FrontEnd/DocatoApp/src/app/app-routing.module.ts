import { AuthGuard } from './guards/auth.guard.service';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'users', component:UsersComponent, canActivate: [AuthGuard]},
  {path:'about', component:AboutComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

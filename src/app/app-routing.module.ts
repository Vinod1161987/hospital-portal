import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path:'dashboard', component: RegisterComponent},
  {path:'patient', component: RegisterComponent, canActivate: [AuthGuard]},
  {path:'about', component: RegisterComponent},
  {path:'support', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

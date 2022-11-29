import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
// import { EditUserComponent } from './edit-user/edit-user.component';
const routes: Routes = [
  { path: 'UserDashboardComponent', component: UserDashboardComponent },
  { path: 'HomeComponent', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'AddUserComponent', component: AddUserComponent },
  { path: 'EditUserComponent', component: EditUserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

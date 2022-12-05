import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';


import { AddEditComponent } from './add-edit/add-edit.component';
// import { EditUserComponent } from './edit-user/edit-user.component';
const routes: Routes = [
  { path: 'UserDashboardComponent', component: UserDashboardComponent },
  { path: 'HomeComponent', component: HomeComponent },
  { path: '', component: HomeComponent },
 
  { path: 'AddEditComponent', component:AddEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

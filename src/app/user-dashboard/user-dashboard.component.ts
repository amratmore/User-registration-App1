import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  formValue!: FormGroup; 

  userobj:UserModel = new UserModel;

  alluser: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      age:[''],
      email:[''],
      address:[''],
      city:[''],
      phone:[''],
      middlename:[''],
      lastname:[''],
      pincode:[''],

      
    })
    this.AllUser();
  }

  AddUser(){
    this.userobj.address = this.formValue.value.address;
    this.userobj.city = this.formValue.value.city;
    this.userobj.name = this.formValue.value.name;
    this.userobj.email = this.formValue.value.email;
    this.userobj.phone = this.formValue.value.phone;
    this.userobj.age = this.formValue.value.age;
    this.userobj.middlename = this.formValue.value.middlename;
    this.userobj.lastname = this.formValue.value.lastname;
    this.userobj.pincode = this.formValue.value.pincode

    this.api.postUser(this.userobj).subscribe({
      next: (v) => {console.log(v)},
    error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.AllUser();
      this.formValue.reset();
    } })

  }

  AllUser(){
    this.api.getUser().subscribe(res => {
      this.alluser = res;
    })
  }

  EditUser(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['class'].setValue(data.class);
    this.formValue.controls['phone'].setValue(data.phone);
    this.formValue.controls['age'].setValue(data.age);
    this.formValue.controls['middlename'].setValue(data.middlename);
    this.formValue.controls['lastname'].setValue(data.lastname);
    this.formValue.controls['pincode'].setValue(data.pincode);
    this.userobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateUser(){
    this.userobj.address = this.formValue.value.address;
    this.userobj.city = this.formValue.value.city;
    this.userobj.name = this.formValue.value.name;
    this.userobj.email = this.formValue.value.email;
    this.userobj.age = this.formValue.value.age;
    this.userobj.phone = this.formValue.value.phone;
    this.userobj.middlename = this.formValue.value.middlename;
    this.userobj.lastname = this.formValue.value.lastname;
    this.userobj.pincode = this.formValue.value.pincode;
    this.api.putUser(this.userobj,this.userobj.id).subscribe(res => {
      alert("Data Updated");
      this.AllUser();
      this.SaveShowBtn();
    })


  }


  DeleteUser(data:any){
    this.api.deleteUser(data.id).subscribe(res => {
      alert("Record Deleted");
      this.AllUser();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



}

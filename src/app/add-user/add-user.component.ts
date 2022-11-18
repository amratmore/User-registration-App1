// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add-user',
//   templateUrl: './add-user.component.html',
//   styleUrls: ['./add-user.component.css']
// })
// export class AddUserComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from './user.model';

import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-add-user-component',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})


export class AddUserComponent implements OnInit {

  formValue!: FormGroup; 

  userobj:UserModel = new UserModel;

  userdata: any ={};

  

  alluser: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      // firstname:(["",Validators.required,Validators.pattern('[a-zA-Z].*')]),
      // age:(['',Validators.required]),
      // email:(['',Validators.email,Validators.required]),
      // address:(['',Validators.required]),
      // city:(['',Validators.required]),
      // phone:(['',Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0,9].*')]),
      // middlename:(['',Validators.required,Validators.pattern('[a-zA-Z].*')]),
      // lastname:(['',Validators.required,Validators.pattern('[a-zA-Z].*')]),
      // pincode:(['',Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern('[0,9].*')]),
      // state:(['',Validators.required]),

      firstname:[''],
      age:[''],
      email:[''],
      address:[''],
      city:[''],
      phone:[''],
      middlename:[''],
      lastname:[''],
      pincode:[''],
      state:[''],
      countrycode:[''],

    })
    this.AllUser();
  }

  AddUser(){
    this.userobj.address = this.formValue.value.address;
    this.userobj.city = this.formValue.value.city;
    this.userobj.firstname = this.formValue.value.firstname;
    this.userobj.email = this.formValue.value.email;
    this.userobj.phone = this.formValue.value.phone;
    this.userobj.age = this.formValue.value.age;
    this.userobj.middlename = this.formValue.value.middlename;
    this.userobj.lastname = this.formValue.value.lastname;
    this.userobj.pincode = this.formValue.value.pincode
    this.userobj.state = this.formValue.value.state
    this.userobj.countrycode = this.formValue.value.countrycode

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
    this.formValue.controls['firstname'].setValue(data.firstname);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['class'].setValue(data.class);
    this.formValue.controls['phone'].setValue(data.phone);
    this.formValue.controls['age'].setValue(data.age);
    this.formValue.controls['middlename'].setValue(data.middlename);
    this.formValue.controls['lastname'].setValue(data.lastname);
    this.formValue.controls['pincode'].setValue(data.pincode);
    this.formValue.controls['state'].setValue(data.state);
    this.formValue.controls['countrycode'].setValue(data.countrycode);
    this.userobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateUser(){
    this.userobj.address = this.formValue.value.address;
    this.userobj.city = this.formValue.value.city;
    this.userobj.firstname = this.formValue.value.firstname;
    this.userobj.email = this.formValue.value.email;
    this.userobj.age = this.formValue.value.age;
    this.userobj.phone = this.formValue.value.phone;
    this.userobj.middlename = this.formValue.value.middlename;
    this.userobj.lastname = this.formValue.value.lastname;
    this.userobj.pincode = this.formValue.value.pincode;
    this.userobj.state = this.formValue.value.state;
    this.userobj.countrycode = this.formValue.value.countrycode;
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


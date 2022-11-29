
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from './user.model';
import { Router, ActivatedRoute } from '@angular/router'
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-add-user-component',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})


export class AddUserComponent implements OnInit {

  formValue!: FormGroup;
  id!: number
  userobj: UserModel = new UserModel;
  isInAddMode!: boolean;
  state: any;
  countryCode: any;
  
  userdata: any = {};
  isadded!: boolean;
  alluser: any;


  btnUpdateShow: boolean = false;

  btnSaveShow: boolean = true;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstname: (['', Validators.required,  ]),
      middlename: (['', Validators.required, ]),
      lastname: (['', Validators.required, ]),
       age: (['', Validators.required, ]),
       phone: (['', [Validators.required, ]]),
      // email: (['', Validators.email, Validators.required]),
      address: (['', Validators.required]),
      city: (['', Validators.required]),
      // countryCode: (['', Validators.required]),
      // state: (['', Validators.required]),
      pincode: (['', Validators.required, ]),



      // firstname:[''],
      // age:[''],
      email:[''],
      // address:[''],
      // city:[''],
      // phone:[''],
      // middlename:[''],
      // lastname:[''],
      // pincode:[''],
      state:[''],
      countrycode:[''],

    })


    this.AllUser();
    this.AllCountry();
    this.AllState();
    console.log("country :", this.countryCode)
  }
  untouched(data){
    return data.touched
  }
  
  // get p(){
  //   return this.formValue.controls;
  // }

  get firstname() {
    return this.formValue.get('firstname');
  }
  get middlename() {
    return this.formValue.get('middlename');
  }
  get lastname() {
    return this.formValue.get('lastname');
  }
  get age() {
    return this.formValue.get('age');
  }
  get email() {
    return this.formValue.get('email');
  }
  get countrycode() {
    return this.formValue.get('countrycode');
  }
  get phone() {
    return this.formValue.get('phone');
  }
  get address() {
    return this.formValue.get('address');
  }
  get city() {
    return this.formValue.get('city');
  }
  get states() {
    return this.formValue.get('state');
  }
  get pincode() {
    return this.formValue.get('pincode')
  }


  AddUser() {
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
      next: (v) => { console.log(v) },
      error: (e) => {
        alert("Error")
        console.log(e)
      },
      complete: () => {
        this.isadded = true;
        setTimeout((isadded) => {
          this.isadded = false
        }, 3000);
        // console.log('complete')
        // alert("Data Saved")
        this.AllUser();
        this.formValue.reset();
      }
    })

  }

  AllUser() {
    this.api.getUser().subscribe(res => {
      this.alluser = res;
    })
  }
  AllCountry() {
    this.api.getcountrycode().subscribe(res => {
      this.countryCode = res
    })
  }
  AllState() {
    this.api.getstate().subscribe(res => {
      this.state = res
    })
  }

  UpdateShowBtn() {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn() {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }



}


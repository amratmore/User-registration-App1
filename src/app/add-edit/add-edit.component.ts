import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
 id!:number;
 
  userobj:UserModel = new UserModel;
  formValue: any;
  alluser: any;
  editUser:any;
  InEdit: boolean=false;
  InAdd: boolean=true;
  InAddmsg:boolean=false;
  state: any;
  countryCode: any;




  constructor(private fb:FormBuilder, private api:ApiService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      firstname: (['', Validators.required, ]),
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
    if(this.api.editmode==true){
      this.editUser=this.api.getEditUser();
      this.InEdit=true;
      this.InAdd=false;

      this.populateEditUserData(this.editUser);
    }
  }
  populateEditUserData(data){

    this.formValue.controls['firstname'].setValue(data.firstname);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['phone'].setValue(data.phone);
    this.formValue.controls['age'].setValue(data.age);
    this.formValue.controls['middlename'].setValue(data.middlename);
    this.formValue.controls['lastname'].setValue(data.lastname);
    this.formValue.controls['pincode'].setValue(data.pincode);
    this.formValue.controls['state'].setValue(data.state);
    this.formValue.controls['countrycode'].setValue(data.countrycode);

    this.api.editmode=false;

  }
  untouched(data){
    return data.touched
  }
  get firstname():FormControl {
    return this.formValue.get('firstname') as FormControl;
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


  UpdateUser(){
    this.editUser.address = this.formValue.value.address;
    this.editUser.city = this.formValue.value.city;
    this.editUser.firstname = this.formValue.value.firstname;
    this.editUser.email = this.formValue.value.email;
    this.editUser.age = this.formValue.value.age;
    this.editUser.phone = this.formValue.value.phone;
    this.editUser.middlename = this.formValue.value.middlename;
    this.editUser.lastname = this.formValue.value.lastname;
    this.editUser.pincode = this.formValue.value.pincode;
    this.editUser.state = this.formValue.value.state;
    this.editUser.countrycode = this.formValue.value.countrycode;
    this.api.editmsg=true
    this.api.putUser(this.editUser,this.editUser.id).subscribe(res => {
      this.AllUser();
      this.api.editmode=false;
    })  


  }

  AllUser(){
    this.api.getUser().subscribe(res => {
      this.alluser = res;
    })
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
      next: (v) => { console.log(v) },
      error: (e) => {
        alert("Error")
        console.log(e)
      },
      complete: () => {
        this.InAddmsg = true;
 
        setTimeout(() => {
          this.InAddmsg = false
 
          this.router.navigate(['/HomeComponent'])
        }, 3000);
        // console.log('complete')
        // alert("Data Saved")
        this.AllUser();
        this.formValue.reset();
      } })
 
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


}

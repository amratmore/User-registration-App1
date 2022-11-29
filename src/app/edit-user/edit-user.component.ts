import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../add-user/user.model';



@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUser:any;
  

  formValue!: FormGroup; 
  isedited!: boolean;
  isdeleted!:boolean;
  countryCode: any;
  state: any;
  userobj:UserModel = new UserModel;

  userdata: any ={};

  

  alluser: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;
  activatedroute: any;
  product: any;
  dispaydetails:boolean =true;
  navigate: any;
  router: any;
  goback:boolean =false;
  

  constructor(private formBuilder:FormBuilder, private api:ApiService, private http:HttpClient ) { }

  ngOnInit(): void{
    this.formValue = this.formBuilder.group({
      // firstname:(["",Validators.required,]),
      // age:(['',Validators.required]),
      // email:(['',Validators.email,Validators.required]),
      // address:(['',Validators.required]),
      // city:(['',Validators.required]),
      // phone:(['',Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0,9].*')]),
      // middlename:['',[Validators.required,Validators.pattern('[a-zA-Z].*')]],
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
      countrycode:['']

    })
    this.AllUser()
    this.AllCountry();
    this.AllState();
    this.editUser=this.api.getEditUser();
    console.log(this.editUser)
    

    this.formValue.controls['firstname'].setValue(this.editUser.firstname);
    this.formValue.controls['city'].setValue(this.editUser.city);
    this.formValue.controls['address'].setValue(this.editUser.address);
    this.formValue.controls['email'].setValue(this.editUser.email);
    this.formValue.controls['phone'].setValue(this.editUser.phone);
    this.formValue.controls['age'].setValue(this.editUser.age);
    this.formValue.controls['middlename'].setValue(this.editUser.middlename);
    this.formValue.controls['lastname'].setValue(this.editUser.lastname);
    this.formValue.controls['pincode'].setValue(this.editUser.pincode);
    this.formValue.controls['state'].setValue(this.editUser.state);
    this.formValue.controls['countrycode'].setValue(this.editUser.countrycode);
  
  }

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
  //   this.activatedroute.data.subscribe(data => {
  //     this.data=data;
  // })
  //   console.log("edit user data ",this.data)
  // }

  AllUser(){
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

  EditUser(data: any){
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
    this.userobj.id = data.id;
    this.UpdateShowBtn();
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
    this.api.putUser(this.editUser,this.editUser.id).subscribe(res => {
      // alert("Data Updated");
      this.isedited=true;
      setTimeout((isedited) => {
        this.isedited=false;
        this.router.navigate(['/UserDashboardComponent'])
        // this.goback=true
      }, 3000);
      // this.isedited=fa;
      this.AllUser();
      this.SaveShowBtn();
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
   goDashboard(){
    this.router.navigate(['/UserDashboardComponent'])

   }
}

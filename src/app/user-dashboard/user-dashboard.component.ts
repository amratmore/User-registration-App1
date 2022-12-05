import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { UserModel } from './user.model';
import { map } from 'rxjs';


// import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})


export class UserDashboardComponent implements OnInit {

  formValue!: FormGroup; 
  isedited!: boolean;
  isdeleted!:boolean;
  // countryCode: any;
  // state: any;
  userobj:UserModel = new UserModel;

  userdata: any ={};

  

  alluser: any;

  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;


  constructor(private formBuilder:FormBuilder, private api:ApiService, private http:HttpClient ) { }

  ngOnInit(): void{
   
    this.AllUser()

  if(this.api.editmsg==true){
    this.isedited=true;
    setTimeout((isedited) =>{
      this.isedited=false;
    },3000);
    this.api.editmsg=false
  }
  }
  

  

  AllUser(){
    this.api.getUser().subscribe(res => {
      this.alluser = res;
    })
  }
 

  DeleteUser(data:any){
    this.api.deleteUser(data.id).subscribe(res => {
      this.isdeleted=true;
      setTimeout((isdeleted)=>{
          this.isdeleted=false
      },3000)
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

  editprevUser(user){
    this.api.setEditUser(user);
    this.api.editmode=true
  }



}

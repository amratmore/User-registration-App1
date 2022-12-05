import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getUById(id: number) {
    throw new Error('Method not implemented.');
  }
  edituser:any;
  editmode:any;
  editmsg:boolean=false;

  constructor(private _http:HttpClient) { }

  // Post Method For Add User
  postUser(data:any)
  {
    return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=> {
      return res
    }))
  }

    // Get Method For All User
    getUser()
    {
      return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=> {
        return res
      }))
    }

      // Put Method For Update USer
  putUser(data:any, id:number)
  {
    return this._http.put<any>("http://localhost:3000/posts/" + id,data).pipe(map((res:any)=> {
      return res
    }))
  }

  // Delete Method For Update User
  deleteUser(id:number)
  {
    return this._http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res:any)=> {
      return res
    }))
  }

  getstate()
  {
    return this._http.get<any>("http://localhost:3000/states/").pipe(map((res:any)=> {
      return res
    }))
  }
  getcountrycode()
  {
    return this._http.get("http://localhost:3000/countrycodes/").pipe(map((res:any)=> {
      console.log("by api res :",res)
      return res
    }))
  }
  setEditUser(user){
    this.edituser=user;
  }
  getEditUser(){
    return this.edituser;
  }
    
}

import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private router:Router) { }
  firstName : string= ""
  lastName : string= ""
  email : string= ""
  password : string= ""
  dob : number= 0
  phone : number= 0
  image_user : string= ""
  


  async signUp(e:any){
    e.preventDefault()
    await axios
    .post("http://localhost:3001/api/items/user", {firstName : this.firstName , lastName : this.lastName , password :this.password , email : this.email , dob : this.dob , phone: this.phone, image_user:this.image_user, id_category: 3})
    .then((response) => {
      if(response.data){
        localStorage.setItem("user", JSON.stringify({firstName : this.firstName , lastName : this.lastName , password :this.password , email : this.email , dob : this.dob , phone: this.phone, image_user:this.image_user, id_category: 3}));
      this.router.navigate(["/"])
      }else{
        this.router.navigate(["/signup"])
      }
      // location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }
}
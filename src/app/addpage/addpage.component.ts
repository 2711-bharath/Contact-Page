import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';

export class person {
  id:string | any;
  name: string | any;
  email: string | any;
  phoneno: string | any;
  landline: string | any;
  website: string | any;
  address: string | any;
}

@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.scss']
})

export class AddpageComponent implements OnInit {
  
  detailForm = new FormGroup({})
  details:person[]|any;
  count:number=0;
  submitted:boolean = false;

  constructor(private service:ContactService,private formBuild:FormBuilder,private router: Router) { 
    this.detailForm = this.formBuild.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      landline : [''],
      website : [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.details = this.service.getData();
  }

  goHome(){
    this.router.navigateByUrl('/home');
  }
  temp:any;
  onSubmit(frm:any){
    if(this.details.length!=0){
      this.count = (parseInt(this.details[this.details.length-1].id)+1); 
    }else{
      this.count = 1;
    }
    this.temp = {
      id:String(this.count),
      name:frm.name,
      email:frm.email,
      mobile:frm.mobile,
      landline:frm.landline,
      website:frm.website,
      address:frm.address
    }   
    
    this.count++;
    console.log(this.temp);
    this.service.pushData(this.temp);
    this.detailForm.reset();
    this.router.navigateByUrl('/home');
  }

}

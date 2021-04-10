import { Component, OnInit } from '@angular/core';
import {ContactService} from '../person-Service/contact.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { Person } from '../person-Class/person';  


@Component({
  selector: 'app-addpage',
  templateUrl: './addpage.component.html',
  styleUrls: ['./addpage.component.scss']
})

export class AddpageComponent implements OnInit {
  
  detailForm = new FormGroup({})
  details:Person[]|any;
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

  goHome(id:string){
    this.router.navigate(['/home',id]);
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
    this.router.navigate(['/home',this.temp.id]);
  }

}

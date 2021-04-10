import { Component, OnInit } from '@angular/core';
import {ContactService} from '../person-Service/contact.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'
import { Person } from '../person-Class/person';  


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  detailForm = new FormGroup({})

  activeId:string="";
  currentPerson:Person | any;
  details:Person[]|any;


  constructor(private service:ContactService,private formBuild:FormBuilder, private route:ActivatedRoute, private router:Router) {
    this.detailForm = this.formBuild.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      landline : [''],
      website : [''],
      address: ['']
    });
   }


  id:string|any;
  sub:any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.details = this.service.getData();
    console.log(this.id)
    if(this.details.length!=0){
      this.currentPerson = this.details[0];
      if(this.id != null){
        var index = this.details.map((value:Person) => { return value.id }).indexOf(this.id);
        console.log(index)
        if(index==-1){
          this.currentPerson="";
          return;
        }
        this.currentPerson = this.details[index];  
        this.activeId = this.id;
      }else{
        this.activeId = this.currentPerson.id;
        this.router.navigate(['/home',this.activeId])
      }
    }
  }


  display(id:string){
      var index = this.details.map((value:Person) => { return value.id }).indexOf(id);
      this.currentPerson = this.details[index];
      console.log(this.currentPerson);
      this.activeId = id;
      this.editForm = false;
  }


  editForm = false;
  edit(){
    this.editForm=true;
    var index = this.details.map((value:Person) => { return value.id }).indexOf(this.activeId);
    this.currentPerson = this.details[index];
    console.log(this.currentPerson)
    this.activeId = this.currentPerson.id;
    this.detailForm.setValue({name:this.currentPerson.name,email:this.currentPerson.email,mobile:this.currentPerson.mobile, landline:this.currentPerson.landline,website:this.currentPerson.website,address:this.currentPerson.address})
  }


  delete(){
    if(this.details.length==1){
      this.details = this.service.deleteData(this.activeId);
      this.currentPerson='';
      return;
    }
    this.details = this.service.deleteData(this.activeId);
    this.activeId = this.details[0].id;
    this.display(this.activeId)
    this.router.navigate(['/home',this.activeId])
  }


  onSubmit(frm:any){
    this.editForm = false;
    this.details = this.service.updateData(this.activeId,frm);
    return;
  }


}

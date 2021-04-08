import { Component, OnInit } from '@angular/core';
import {ContactService} from '../contact.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import {ActivatedRoute} from '@angular/router'

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  detailForm = new FormGroup({})

  activeId:string="1";
  currentPerson:person | any;
  details:person[]|any;


  constructor(private service:ContactService,private formBuild:FormBuilder, private route:ActivatedRoute) {
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
  //   this.sub=this.Activatedroute.paramMap.subscribe(params => { 
  //     console.log(params);
  //      this.id = params.get('id');  
  //  });
  this.id = this.route.snapshot.paramMap.get("id");
  console.log(this.id);
    this.details = this.service.getData();
    if(this.details.length!=0){
      this.currentPerson = this.details[0];
      if(this.id != null){
        var index = this.details.map((value:person) => { return value.id }).indexOf(this.id);
        this.currentPerson = this.details[index];  
        this.activeId = this.id;
      }else{
        this.activeId = this.currentPerson.id;
      }
    }
  }

  display(id:string){
      console.log(id);
      var index = this.details.map((value:person) => { return value.id }).indexOf(id);
      this.currentPerson = this.details[index];
      console.log(this.currentPerson);
      this.activeId = id;
      this.editForm = false;
  }

  editForm = false;
  edit(){
    this.editForm=true;
    var index = this.details.map((value:person) => { return value.id }).indexOf(this.activeId);
    this.currentPerson = this.details[index];
    console.log(this.currentPerson)
    this.activeId = this.currentPerson.id;
    this.detailForm.setValue({name:this.currentPerson.name,email:this.currentPerson.email,mobile:this.currentPerson.mobile, landline:this.currentPerson.landline,website:this.currentPerson.website,address:this.currentPerson.address})
  }

  delete(){
    if(this.details.length==0){
      return;
    }
    else if(this.details.length==1){
      this.details = this.service.deleteData(this.activeId);
      this.currentPerson='';
      return;
    }
    this.details = this.service.deleteData(this.activeId);
    this.activeId = this.details[0].id;
    this.display(this.activeId)
  }

  onSubmit(frm:any){
    this.editForm = false;
    this.details = this.service.updateData(this.activeId,frm);
    return;
  }

}

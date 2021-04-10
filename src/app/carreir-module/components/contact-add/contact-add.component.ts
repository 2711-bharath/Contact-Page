import { Component, OnInit } from '@angular/core';
import { PersonServiceService } from '../../service/person-service.service';
import { Person } from '../../model/person.model';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {

  detailForm = new FormGroup({})

  constructor(private service:PersonServiceService,private formBuild:FormBuilder, private route:ActivatedRoute, private router:Router) { 
    this.detailForm = this.formBuild.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      landline : [''],
      website : [''],
      address: ['']
    });
  }
  submitted:boolean = false
  contactDetails:Person[];
  id:string;

  ngOnInit(): void {
    this.contactDetails = this.service.getContactDetails();
    this.id = this.route.snapshot.paramMap.get("id");
    this.router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        this.id = this.route.snapshot.paramMap.get("id");
      } 
    })
    
    if(this.id!=null){
      this.fillForm(this.id)
    }
  }

  fillForm(id:string){
    console.log(id)
    var index = this.contactDetails.map((value:Person) => { return value.id }).indexOf(id);
    var currentPerson = this.contactDetails[index];
    console.log(currentPerson)
    this.detailForm.setValue({name:currentPerson.name,email:currentPerson.email,mobile:currentPerson.mobile, landline:currentPerson.landline,website:currentPerson.website,address:currentPerson.address})
  }

  onSubmit(frm:any){

    if(frm.valid){
      this.submitted = true;
      return;
    }else{
      if(this.id!=null){
        let temp = new Person(this.id,frm.name,frm.email,frm.mobile,frm.landline,frm.website,frm.address)
        console.log(temp);
        this.service.updateDate(temp);
        this.router.navigate(['/home',this.id])
      }else{
        console.log(frm)
        if(this.contactDetails.length==0){
          var newId:string|any = "1"; 
        }else{
          var newId:string|any = ((+this.contactDetails[this.contactDetails.length-1].id)+1).toString();
        }
        console.log(newId,typeof(newId))
        let temp = new Person(newId,frm.name,frm.email,frm.mobile,frm.landline,frm.website,frm.address)
        console.log(temp);
        this.service.pushData(temp);
        this.router.navigate(['/home',newId]);
      }
    }
  }

}

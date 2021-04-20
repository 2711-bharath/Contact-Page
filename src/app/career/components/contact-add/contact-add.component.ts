import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { Contact } from '../../model/contacts.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {

  detailForm = new FormGroup({})

  constructor(private service:ContactService,private formBuild:FormBuilder, private route:ActivatedRoute, private router:Router) { }

  submitted:boolean = false
  contactDetails:Contact[]=[];
  contactDetailsStatus:Boolean;
  id:string;

  createForm(){
    this.detailForm = this.formBuild.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/), Validators.maxLength(10)]],
      landline : [''],
      website : [''],
      address: ['']
    });
  }

  ngOnInit(): void {

    this.createForm();
    let datastatus:object = this.service.getContactDetails()

    this.contactDetailsStatus = datastatus['status']; 
    if(this.contactDetailsStatus){
      this.contactDetails = datastatus['contacts'];
    }
    this.id = this.route.snapshot.paramMap.get("id");
    this.router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        this.id = this.route.snapshot.paramMap.get("id");
      }
    })
    
    if(this.id!=null){
        this.fillForm(this.id)
    }else{
      this.router.navigateByUrl('/add')
    } 

  }

  fillForm(id:string){
    var index = this.contactDetails.map((value:Contact) => { return value.id }).indexOf(id);
    var currentPerson = this.contactDetails[index];
    this.detailForm.setValue({name:currentPerson.name,email:currentPerson.email,mobile:currentPerson.mobile, landline:currentPerson.landline,website:currentPerson.website,address:currentPerson.address})
  }

  onSubmit(frm:any){

    if(this.detailForm.invalid){
      this.submitted = true;
      return;
    }else{
      if(this.id!=null){
        let temp = new Contact(this.id,frm.name,frm.email,frm.mobile,frm.landline,frm.website,frm.address)
        this.service.update(temp);
        this.router.navigate(['/home',this.id])
      }else{
        this.service.contactId++;
        var newId:string = (this.service.contactId).toString();
        let temp = new Contact(newId,frm.name,frm.email,frm.mobile,frm.landline,frm.website,frm.address)
        this.service.add(temp);
        this.router.navigate(['/home',newId]);
      }
    }
  }

}

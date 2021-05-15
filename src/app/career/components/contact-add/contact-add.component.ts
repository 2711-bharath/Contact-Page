import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { Contact } from '../../model/contacts.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

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
  status:boolean = false;
  currentPerson:Contact;
  loading:boolean = true;
  loadingForm:boolean = true;

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
    this.service.getContactDetails().subscribe(dataStatus =>{
      this.contactDetails = dataStatus['contacts']
      this.status = dataStatus['status']
      this.loading = false;
    })
    this.id = this.route.snapshot.paramMap.get("id");
    this.createForm();
    if(this.id!=null){
        this.fillForm(this.id);
    }else{
      this.router.navigateByUrl('/add/contact')
      this.loadingForm = false;
    }   

  }


  fillForm(id:string){
    var data = this.service.getContact(id)
    data.subscribe(dataStatus => {
      let contact =dataStatus['contact'];
      this.loadingForm = false;
      this.detailForm.setValue({name:contact.name,email:contact.email,mobile:contact.mobile,landline:contact.landline,website:contact.website,address:contact.address})
    })
  }

  onSubmit(frm:Contact){

    if(this.detailForm.invalid){
      this.submitted = true;
      return;
    }else{
      if(this.id!=null){
        let contact: Contact = new Contact({id:this.id, name:frm.name,email:frm.email,mobile:frm.mobile,landline:frm.landline,website:frm.website,address:frm.address})
        this.service.UpdateContact(contact);
        this.router.navigate(['/home/contacts',this.id])
      }else{
        let contactId = this.service.addContact(frm);
        let self = this;
        contactId.then(function(docRef) {
          self.service.activeContactId = docRef.id
          self.router.navigate(['/home/contacts',docRef.id])
      })
      }
    }
  }

}

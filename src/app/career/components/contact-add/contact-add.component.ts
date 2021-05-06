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
    this.checkStatus();
    let data = this.service.getContactDetails();
    data.snapshotChanges().subscribe(obj =>{
      this.contactDetails = obj.map(e=> {
        let data = e.payload.doc.data() as Contact; 
        return {
          id : e.payload.doc.id,
          ...data
        } as Contact
      })
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

  checkStatus(){
    this.service.getContactDetails().valueChanges().subscribe(data => {
      this.loading = false;
      if(data.length == 0){
        this.status = false;
      }else{
        this.status = true;
      }
    })
  }

  fillForm(id:string){
    var data = this.service.getContact(id)
    data.subscribe(val => {
      let contact =val.data() as Contact
      console.log(contact)
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
        let contact: Contact = new Contact(frm.name,frm.email,frm.mobile,frm.landline,frm.website,frm.address)
        console.log(contact)
        this.service.Update(contact,this.id);
        this.router.navigate(['/home/contacts',this.id])
      }else{
        let contactId = this.service.add(frm);
        let self = this;
        contactId.then(function(docRef) {
          self.router.navigate(['/home/contacts',docRef.id])
      })
      }
    }
  }

}

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
      this.contactDetails = [];
      obj.forEach(details => {
        let x = details.payload.toJSON();
        x['$id'] = details.key;
        this.contactDetails.push(x as Contact);
      })
    })
    this.id = this.route.snapshot.paramMap.get("id");
    this.createForm();
    if(this.id!=null){
        this.fillForm(this.id)
    }else{
      this.router.navigateByUrl('/add/contact')
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
    data.valueChanges().subscribe(val => {
      this.detailForm.setValue({name:val?.name,email:val?.email,mobile:val?.mobile, landline:val?.landline,website:val?.website,address:val?.address})
    })
  }

  onSubmit(frm:any){

    if(this.detailForm.invalid){
      this.submitted = true;
      return;
    }else{
      if(this.id!=null){
        let temp = new Contact(frm.name,frm.email,frm.mobile,frm.landline,frm.website,frm.address)
        this.service.update(temp);
        this.router.navigate(['/home/contacts',this.id])
      }else{
        let temp = new Contact(frm.name,frm.email,frm.mobile,frm.landline,frm.website,frm.address)
        let contactId = this.service.add(temp);
        this.router.navigate(['/home/contacts',contactId])
      }
    }
  }

}

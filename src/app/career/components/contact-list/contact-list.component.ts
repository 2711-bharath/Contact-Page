import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { Contact } from '../../model/contacts.model';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {

  constructor(private service:ContactService, private router:Router, private route:ActivatedRoute) { }
  
  contactDetails:Contact[];
  status:boolean = false;
  loading:boolean = true;

  ngOnInit(): void {
    this.checkStatus();
    let data = this.service.getContactDetails();
    data.snapshotChanges().subscribe(obj =>{
      this.contactDetails = obj.map(e=> {
        let data = e.payload.doc.data() as Contact; //here solutions
        return {
          id : e.payload.doc.id,
          ...data
        } as Contact
      })
    })
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

  
}

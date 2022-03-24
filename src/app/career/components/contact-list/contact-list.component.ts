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

    this.service.getContactDetails().subscribe(dataStatus =>{
      this.contactDetails = dataStatus['contacts'];
      this.status = dataStatus['status'];
      this.loading = false;    

      var urlVal:string = this.router.url;
      console.log(urlVal)
      if(urlVal != '/home/contacts'){
        this.router.navigateByUrl(urlVal)
      }else{
        this.service.activeContactId = this.contactDetails[0].id;
        this.router.navigate(['home/contacts',this.service.activeContactId])
      }
    })
    
  }

  

  
}

import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { Contact } from '../../model/contacts.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {


  constructor(private service:ContactService,private router:Router, private route:ActivatedRoute) { }
  
  contactDetails:Contact[];
  contactDetailsStatus:boolean;

  ngOnInit(): void {
    let x:any = this.service.getContactDetails();
    this.contactDetails = x[0];
    this.contactDetailsStatus = x[1];
    if(this.contactDetails.length>0){
      let href = this.router.url;
      if(href=="/home"){
        this.router.navigate(['/home',this.contactDetails[0].id]);
      }else{
        this.router.navigateByUrl(href);
      }
    }
  }

}

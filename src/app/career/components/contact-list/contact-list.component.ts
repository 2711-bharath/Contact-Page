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
  
  contactDetails:Contact[]=[];
  status:boolean;

  ngOnInit(): void {
    let datastatus:object = this.service.getContactDetails();
    this.status = datastatus['status'];
    if(this.status){
      this.contactDetails = datastatus['contacts'];
      // let url = this.router.url;
      // if(url=="/home"){
      //   this.router.navigate(['/home',this.contactDetails[0].id]);
      // }
      // else{
      //   this.router.navigateByUrl(url);
      // }
    }
  }

}

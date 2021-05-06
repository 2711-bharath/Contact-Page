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
    this.checkStatus()
    let data = this.service.getContactDetails();
    data.snapshotChanges().subscribe(obj =>{
      this.contactDetails = [];
      obj.forEach(details => {
        let x = details.payload.toJSON();
        x['$id'] = details.key;
        this.contactDetails.push(x as Contact)
      })
      // let id = this.route.snapshot.paramMap.get("id");
      // if(id==null){
      //   this.router.navigate(['home/contacts',this.contactDetails[0].$id])
      // }
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

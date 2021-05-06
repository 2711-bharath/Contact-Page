import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Contact } from '../../model/contacts.model';  
import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html',
  styleUrls: ['./contact-show.component.scss']
})

export class ContactShowComponent implements OnInit {

  constructor(private service:ContactService, private route:ActivatedRoute, private router:Router) {}

  displayForm:boolean=false;
  personDetails:Contact;
  status:boolean=false;
  currId:string;

  delete(){
    this.service.deleteContact(this.currId);
    var id;
    let d = this.service.getLastContactId()
    let self = this;
    d.then(function(snapshot) {
        snapshot.forEach((childSnapshot) => {
            id =  childSnapshot.key;
            self.router.navigate(['home/contacts',id])
        });
    })
  }

  edit(){
    this.router.navigate(['home/contacts/edit',this.currId]);
  }

  addressArray:string[];
  lastAddress:string;
  wrongId:string = "false";
  contactDetails:Contact[]=[];

  ngOnInit(): void {

    this.currId = this.route.snapshot.paramMap.get("id");
    this.router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        this.currId = this.route.snapshot.paramMap.get("id");
        this.updateContact(this.currId);
      } 
    })
    if(this.currId!=null){
      this.updateContact(this.currId);
    }else{
      this.status = false;
    }
  }

  updateContact(id:string){
      this.status = true;
      let data = this.service.getContact(id)
      data.snapshotChanges().subscribe(val => {
        if(val==null){
          this.status = false;
          return;
        }  
        let x = val.payload.toJSON();
        let temp = []
        temp.push(x as Contact)
        this.personDetails = temp[0];  
      })
  }
}


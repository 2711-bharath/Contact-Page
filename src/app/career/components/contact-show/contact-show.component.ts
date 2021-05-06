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
  loading:boolean = true;

  delete(){
    this.service.deleteContact(this.currId);
    this.router.navigate(['home/contacts']);
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
        this.loading = true
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
      data.subscribe((obj)=>{
        let data = obj.data() as Contact; 
        if(data==undefined){
          this.status = false;
          return;
        }
        this.loading = false;
        this.personDetails = data;   
      })
  }
}


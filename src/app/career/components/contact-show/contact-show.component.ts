import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Contact } from '../../model/contacts.model';  
import { ContactService } from '../../service/contact.service';
// import { Contact, ContactService } from '../../../career-module'; 
@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html',
  styleUrls: ['./contact-show.component.scss']
})
export class ContactShowComponent implements OnInit {

  constructor(private service:ContactService, private route:ActivatedRoute, private router:Router) {}

  displayForm:boolean=false;
  personDetails:Contact;
  status:boolean;

  delete(id:string){
    
    let datastatus:object = this.service.deleteContact(id);     
    this.personDetails = datastatus['contact'];
    this.status = datastatus['status'];
    console.log(this.status)
    if(!this.status){
      this.router.navigateByUrl('/home')
    }else{
      this.router.navigate(['/home',this.personDetails.id]);
    }
  }

  edit(){
    this.router.navigate(['home/edit',this.personDetails.id]);
  }

  addressArray:string[];
  lastAddress:string;
  wrongId:string = "false";
  contactDetails:Contact[]=[];

  ngOnInit(): void {

    var id:string;
    id = this.route.snapshot.paramMap.get("id");
    this.router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        id = this.route.snapshot.paramMap.get("id");
        this.updateContact(id);
      } 
    })
    console.log(id)
    if(id!=null){
      this.updateContact(id);
    }

  }

  updateContact(id:string){
      let datastatus:object =  this.service.getContact(id);
      this.personDetails = datastatus['contact'];
      this.status = datastatus['status'];
      console.log(this.status)
  }
}


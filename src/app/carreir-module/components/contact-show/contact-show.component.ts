import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import { Person } from '../../model/person.model';  
import { PersonServiceService } from '../../service/person-service.service'

@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html',
  styleUrls: ['./contact-show.component.scss']
})
export class ContactShowComponent implements OnInit {

  constructor(private service:PersonServiceService,private formBuild:FormBuilder, private route:ActivatedRoute, private router:Router) {}

  displayForm:boolean=false;
  personDetails:Person;
  
  delete(id:string){
    this.service.deletePersonDetails(id);
    let details:Person[] = this.service.getContactDetails();
    if(details.length==0){
      this.router.navigateByUrl('/home')
    }else{
      this.router.navigate(['/home',details[0].id]);
    }
  }


  edit(){
    this.router.navigate(['/add',this.personDetails.id]);
  }

  wrongId:string = "false";
  ngOnInit(): void {
    var id:string;
    id = this.route.snapshot.paramMap.get("id");
    console.log(id,typeof(id));
    console.log(this.service.checkId(id))
    if(id!=null){
      if(this.service.checkId(id)){
        this.personDetails = this.service.getPersonDetials(id);
        this.wrongId = "false";
      }else{
        this.wrongId = "true";
      }
    }
    this.router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        id = this.route.snapshot.paramMap.get("id");
        console.log(id)
        if(this.service.checkId(id)){
          this.personDetails = this.service.getPersonDetials(id);   
          this.wrongId = "false";
        }         
        else{
          this.wrongId = "true";
        }
      } 
    })
  }

}

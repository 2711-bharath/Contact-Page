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

  displayForm:string="false";
  personDetails:Person;
  
  delete(id:string){
    this.service.deletePersonDetails(id);
    this.router.navigateByUrl('/home')
  }


  edit(){
    this.router.navigate(['/add',this.personDetails.id]);
  }


  ngOnInit(): void {
    var id:string;
    id = this.route.snapshot.paramMap.get("id");
    console.log(id,typeof(id));
    if(id!=null){
      this.personDetails = this.service.getPersonDetials(id);
    }
    this.router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        id = this.route.snapshot.paramMap.get("id");
        console.log(id)
        this.personDetails = this.service.getPersonDetials(id);            
      } 
    })
  }

}

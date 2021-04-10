import { Injectable } from '@angular/core';
import { Person } from '../model/person.model';
@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {
  contactDetails:Person[];
  activeId:string="1";

  constructor() { 
    this.contactDetails = [
      new Person("1","Harsha Vardan Pendyala","harsha@fosterate.com","7777888855","","","Hyderabad"),
      new Person("2","Network Duke","duke@fosterate.com","7777888855","","","Hyderabad"),
      new Person("3","Arshaque Mohammed","arshaque@fosterate.com","7777888855","","","Hyderabad"),
    ]
  }

  getContactDetails(){
    return this.contactDetails;
  }

  getPersonDetials(id:string){
    var index = this.contactDetails.map((value:Person) => { return value.id }).indexOf(id);
    return this.contactDetails[index];
  }

  deletePersonDetails(id:string){
    var index = this.contactDetails.map((value:Person) => { return value.id }).indexOf(id);
    this.contactDetails.splice(index,1);
  }

  pushData(data:Person){
    this.contactDetails.push(data);
  }

  updateDate(data:Person){
    var index = this.contactDetails.map((value:Person) => { return value.id }).indexOf(data.id);
    this.contactDetails[index] = data;
  }

  checkId(id:string){
    var index = this.contactDetails.map((value:Person) => { return value.id }).indexOf(id);
    if(index == -1){
      return false;
    }else{
      return true;
    }

  }
}

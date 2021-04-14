import { Injectable } from '@angular/core';
import { Contact } from '../model/contacts.model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactDetails:Contact[];
  contactId:number;

  constructor() {
    this.contactDetails = [];
    this.contactId = 0;
  }

  getContactDetails(){
    if(this.contactDetails.length==0){
      return [[],false]
    }else{
      return [this.contactDetails,true];
    }
  }

  getPersonDetials(id:string){
    if(this.contactDetails.length==0){
      return [null,false]
    }else{
      var index = this.contactDetails.map((value:Contact) => { return value.id }).indexOf(id);
      return [this.contactDetails[index],true];
    }
    
  }

  deletePersonDetails(id:string){
    var index = this.contactDetails.map((value:Contact) => { return value.id }).indexOf(id);
    this.contactDetails.splice(index,1);
    console.log(this.contactDetails)
    if(this.contactDetails.length==0){
      return [null,false]
    }else{
      return [this.contactDetails[0],true]
    }
  }

  pushData(contact:Contact){
    if(contact==null|| contact==undefined){
      return;
    }
    this.contactDetails.push(contact);
  }

  updateDate(contact:Contact){
    var index = this.contactDetails.map((value:Contact) => { return value.id }).indexOf(contact.id);
    this.contactDetails[index] = contact;
  }

  checkId(id:string){
    var index = this.contactDetails.map((value:Contact) => { return value.id }).indexOf(id);
    if(index == -1){
      return false;
    }else{
      return true;
    }
  }

  getId(){
    this.contactId++
    return this.contactId;
  }
}

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

  getContactDetails():object{
    if(this.contactDetails.length==0){
      return {contacts:[],status:false}
    }else{
      return {contacts:this.contactDetails,status:true};
    }
  }

  getPersonDetials(id:string):object{
    if(this.contactDetails.length==0){
      return {contact:null,status:false}
    }else{
      var index = this.contactDetails.map((value:Contact) => { return value.id }).indexOf(id);
      return {contact:this.contactDetails[index],status:true};
    }
    
  }

  deletePersonDetails(id:string){
    var index = this.contactDetails.map((value:Contact) => { return value.id }).indexOf(id);
    this.contactDetails.splice(index,1);
    if(this.contactDetails.length==0){
      return {contact:null,status:false}
    }else{
      return {contact:this.contactDetails[0],staus:true}
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

  checkId(id:string):boolean{
    var index = this.contactDetails.map((value:Contact) => { return value.id }).indexOf(id);
    if(index == -1){
      return false;
    }else{
      return true;
    }
  }
}

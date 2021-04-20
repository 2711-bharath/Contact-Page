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
    this.contactId = 1;
  }
 
  getContactDetails():object{
    if(this.contactDetails.length==0){
      return {contacts:null,status:false}
    }else{
      return {contacts:this.contactDetails,status:true};
    }
  }

  getContact(id:string):object{
    if(this.contactDetails.length==0){
      return {contact:null,status:false}
    }else{
      var contact = this.contactDetails.find(value=>value.id==id);
      if(contact==undefined){
        return {contact:null,status:false}
      }
      return {contact:contact,status:true};
    }
    
  }

  deleteContact(id:string):Object{
    var index = this.contactDetails.map((value:Contact) => { return value.id }).indexOf(id);
    this.contactDetails.splice(index,1);
    if(this.contactDetails.length==0){
      return {contact:null,status:false}
    }else{
      return {contact:this.contactDetails[0],status:true}
    }
  }

  add(contact:Contact){
    if(contact==null|| contact==undefined){
      return;
    }
    this.contactDetails.push(contact);
  }

  update(contact:Contact){
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

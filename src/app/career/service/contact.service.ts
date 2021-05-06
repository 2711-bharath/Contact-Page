import { Injectable } from '@angular/core';
import { Contact } from '../model/contacts.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactDetails: AngularFireList<any>;
  contactDetail: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
 
  getContactDetails(){
    this.contactDetails = this.db.list('contact-list');
    return this.contactDetails;
  }

  getContact(id:string){
    this.contactDetail = this.db.object('contact-list/'+id);
    return this.contactDetail;
  }

  deleteContact(id:string){
    this.db.object('contact-list/'+id).remove();
  }

  add(contact:Contact){
    return this.contactDetails.push({
      name: contact.name,
      email: contact.email,
      mobile: contact.mobile,
      landline: contact.landline,
      website: contact.website,
      address: contact.address
    }).ref.key;
  }

  update(contact:Contact){
    this.contactDetail.update({
      name: contact.name,
      email: contact.email,
      mobile: contact.mobile,
      landline: contact.landline,
      website: contact.website,
      address: contact.address
    })
  }

  getLastContactId(){
    return this.db.database.ref('contact-list').limitToLast(1).once('value');
  }

  getFirstContactId(){
    return this.db.database.ref('contact-list').limitToLast(1).once('value');
  }
}


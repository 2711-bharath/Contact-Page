import { Injectable } from '@angular/core';
import { Contact } from '../model/contacts.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private firestore: AngularFirestore) {}
 
  getContactDetails(){
    return this.firestore.collection('contact-list');
  }

  getContact(id:string){
    return this.firestore.doc('contact-list/'+id).get();
  }

  deleteContact(id:string){
    this.firestore.doc('contact-list/'+id).delete();
  }

  add(contact:Contact){
    return this.firestore.collection('contact-list').add(contact)
  }

  Update(contact:Contact,id:any){
    this.firestore.doc('contact-list/'+id).update({
      name:contact.name,
      email:contact.email,
      mobile:contact.mobile,
      landline:contact.landline,
      website:contact.website,
      address:contact.address
    })
  }


}


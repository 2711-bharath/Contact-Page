import { Injectable, Inject } from '@angular/core';
import { Contact } from '../model/contacts.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  contactDetails:Contact[];
  contactDoc:Contact;
  activeContactId:string;

  constructor(private firestore: AngularFirestore) {
    this.contactDetails = []
    this.activeContactId = ""

  }
 
  getContactDetails():Observable<{contacts: Array<Contact> , status: boolean }>{
    var contactDetails = new Array<Contact>();
    return new Observable<any>((sub)=> {
      this.firestore.collection('contact-list').snapshotChanges().subscribe((data)=>{
        contactDetails = []
        data.map(e=> {
          let data = e.payload.doc.data() as Contact; 
          let contact:Contact = {
            id : e.payload.doc.id,
            ...data
          } as Contact
          contactDetails.push(contact);
        })
        if(contactDetails.length != 0){
          sub.next({contacts:contactDetails,status:true});
        }else{
          sub.next({contacts:null,status:false});
        }
      })
    })
  }



  getDetails() {
    const contactDetails = new Array<Contact>();
    return new Observable<any>((sub)=> {
      const contactDetailsRef = this.firestore.collection("contact-list").get()
       .subscribe((contacts)=>{
         if(contacts) {
           contacts.forEach((contact)=> {
             const currContact = contact.data() as Contact;
             currContact['id'] = contact.id;
             contactDetails.push(currContact);
           });
           sub.next(contactDetails);
         }
         if(contactDetailsRef) {
           contactDetailsRef.unsubscribe();
         }
       })
    })
  }

  getContact(id:string): Observable<{contact: Contact, status: boolean }>{
    this.activeContactId = id;
    return new Observable<any>((obj) => {
      this.contactDetails = []
      this.firestore.doc('contact-list/'+id).get().subscribe((contact)=>{
        if(contact && contact.exists){
          const currContact = contact.data() as Contact;
          obj.next({contact:currContact, status: true});
        } else {
          obj.next({contact:null, status: false});
        }
      })
    })
  }


  deleteContact(id:string){
    this.activeContactId = "";
    this.firestore.doc('contact-list/'+id).delete();
  }

  addContact(contact:Contact){
    return this.firestore.collection('contact-list').add(contact);
  }

  UpdateContact(contact:Contact){
    this.firestore.doc('contact-list/'+contact.id).set({
      name:contact.name,
      email:contact.email,
      mobile:contact.mobile,
      landline:contact.landline,
      website:contact.website,
      address:contact.address
    })
  }
}


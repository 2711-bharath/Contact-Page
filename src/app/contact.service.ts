import { Injectable } from '@angular/core';

export class person {
  id:string | any;
  name: string | any;
  email: string | any;
  mobile: string | any;
  landline: string | any;
  website: string | any;
  address: string | any;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactDetails:person[] = [
    {id:"1",name:"Harsha Vardan Pendyala",email:"harsha@fosterate.com",mobile:"7777888855",landline:"",website:"",address:"Hyderabad"},
    {id:"2",name:"Network Duke",email:"duke@fosterate.com",mobile:"7777888855",landline:"",website:"",address:"Hyderabad"},
    {id:"3",name:"Arshaque Mohammed",email:"arshaque@fosterate.com",mobile:"7777888855",landline:"",website:"",address:"Hyderabad"},
  ]  
  constructor() { }

  getData(){
    return this.contactDetails;
  }
  
  pushData(data:person){
    this.contactDetails.push(data)
  }

  updateData(id:string,updateDetails:any){
    var index = this.contactDetails.map((value:person) => { return value.id }).indexOf(id);
    this.contactDetails[index].name = updateDetails.name;
    this.contactDetails[index].email = updateDetails.email;
    this.contactDetails[index].mobile = updateDetails.mobile;
    this.contactDetails[index].landline = updateDetails.landline;
    this.contactDetails[index].website = updateDetails.website;
    this.contactDetails[index].address = updateDetails.address;
    return this.contactDetails;
  }

  deleteData(id:string){
    var index = this.contactDetails.map((value:person) => { return value.id }).indexOf(id);
    this.contactDetails.splice(index,1);
    return this.contactDetails;
  }

}

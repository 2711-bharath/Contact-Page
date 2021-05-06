export class Contact {

    $id:string;
    name: string;
    email: string;
    mobile: string;
    landline: string;
    website: string;
    address: string;

    constructor( name: string, email: string, mobile: string, landline: string, website: string, address: string){
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.landline = landline;
        this.website = website;
        this.address = address;
    }
}

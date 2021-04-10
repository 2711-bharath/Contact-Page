export class Person {
    public id:string;
    public name: string;
    public email: string;
    public mobile: string;
    public landline: string;
    public website: string;
    public address: string;

    constructor(id:string, name: string, email: string, mobile: string, landline: string, website: string, address: string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.landline = landline;
        this.website = website;
        this.address = address;
    }
    
}

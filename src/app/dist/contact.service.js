"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactService = exports.person = void 0;
var core_1 = require("@angular/core");
var person = /** @class */ (function () {
    function person() {
    }
    return person;
}());
exports.person = person;
var ContactService = /** @class */ (function () {
    function ContactService() {
        this.contactDetails = [
            { id: "1", name: "Harsha Vardan Pendyala", email: "harsha@fosterate.com", mobile: "7777888855", landline: "", website: "", address: "Hyderabad" },
            { id: "2", name: "Network Duke", email: "duke@fosterate.com", mobile: "7777888855", landline: "", website: "", address: "Hyderabad" },
            { id: "3", name: "Arshaque Mohammed", email: "arshaque@fosterate.com", mobile: "7777888855", landline: "", website: "", address: "Hyderabad" },
        ];
    }
    ContactService.prototype.getData = function () {
        return this.contactDetails;
    };
    ContactService.prototype.pushData = function (data) {
        this.contactDetails.push(data);
    };
    ContactService.prototype.updateData = function (id, updateDetails) {
        var index = this.contactDetails.map(function (value) { return value.id; }).indexOf(id);
        this.contactDetails[index].name = updateDetails.name;
        this.contactDetails[index].email = updateDetails.email;
        this.contactDetails[index].mobile = updateDetails.mobile;
        this.contactDetails[index].landline = updateDetails.landline;
        this.contactDetails[index].website = updateDetails.website;
        this.contactDetails[index].address = updateDetails.address;
        return this.contactDetails;
    };
    ContactService.prototype.deleteData = function (id) {
        var index = this.contactDetails.map(function (value) { return value.id; }).indexOf(id);
        this.contactDetails.splice(index, 1);
        return this.contactDetails;
    };
    ContactService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ContactService);
    return ContactService;
}());
exports.ContactService = ContactService;

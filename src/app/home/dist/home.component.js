"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = exports.person = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var person = /** @class */ (function () {
    function person() {
    }
    return person;
}());
exports.person = person;
var HomeComponent = /** @class */ (function () {
    function HomeComponent(service, formBuild) {
        this.service = service;
        this.formBuild = formBuild;
        this.detailForm = new forms_1.FormGroup({});
        this.activeId = "1";
        this.editForm = false;
        this.detailForm = this.formBuild.group({
            name: ['', [forms_1.Validators.required]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            mobile: ['', [forms_1.Validators.required]],
            landline: [''],
            website: [''],
            address: ['']
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.details = this.service.getData();
        if (this.details.length != 0) {
            this.currentPerson = this.details[0];
            this.activeId = this.currentPerson.id;
        }
    };
    HomeComponent.prototype.display = function (id) {
        console.log(id);
        var index = this.details.map(function (value) { return value.id; }).indexOf(id);
        this.currentPerson = this.details[index];
        console.log(this.currentPerson);
        this.activeId = id;
        this.editForm = false;
    };
    HomeComponent.prototype.edit = function () {
        this.editForm = true;
        var index = this.details.map(function (value) { return value.id; }).indexOf(this.activeId);
        this.currentPerson = this.details[index];
        console.log(this.currentPerson);
        this.activeId = this.currentPerson.id;
        this.detailForm.setValue({ name: this.currentPerson.name, email: this.currentPerson.email, mobile: this.currentPerson.mobile, landline: this.currentPerson.landline, website: this.currentPerson.website, address: this.currentPerson.address });
    };
    HomeComponent.prototype["delete"] = function () {
        if (this.details.length == 0) {
            return;
        }
        else if (this.details.length == 1) {
            this.details = this.service.deleteData(this.activeId);
            this.currentPerson = '';
            return;
        }
        this.details = this.service.deleteData(this.activeId);
        this.activeId = this.details[0].id;
        this.display(this.activeId);
    };
    HomeComponent.prototype.onSubmit = function (frm) {
        this.editForm = false;
        this.details = this.service.updateData(this.activeId, frm);
        return;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

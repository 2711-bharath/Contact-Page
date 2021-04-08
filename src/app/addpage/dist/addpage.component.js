"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddpageComponent = exports.person = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var person = /** @class */ (function () {
    function person() {
    }
    return person;
}());
exports.person = person;
var AddpageComponent = /** @class */ (function () {
    function AddpageComponent(service, formBuild, router) {
        this.service = service;
        this.formBuild = formBuild;
        this.router = router;
        this.detailForm = new forms_1.FormGroup({});
        this.count = 0;
        this.submitted = false;
        this.detailForm = this.formBuild.group({
            name: ['', [forms_1.Validators.required]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            mobile: ['', [forms_1.Validators.required]],
            landline: [''],
            website: [''],
            address: ['']
        });
    }
    AddpageComponent.prototype.ngOnInit = function () {
        this.details = this.service.getData();
    };
    AddpageComponent.prototype.goHome = function () {
        this.router.navigateByUrl('/home');
    };
    AddpageComponent.prototype.onSubmit = function (frm) {
        if (this.details.length != 0) {
            this.count = (parseInt(this.details[this.details.length - 1].id) + 1);
        }
        else {
            this.count = 1;
        }
        this.temp = {
            id: String(this.count),
            name: frm.name,
            email: frm.email,
            mobile: frm.mobile,
            landline: frm.landline,
            website: frm.website,
            address: frm.address
        };
        this.count++;
        console.log(this.temp);
        this.service.pushData(this.temp);
        this.detailForm.reset();
        this.router.navigateByUrl('/home');
    };
    AddpageComponent = __decorate([
        core_1.Component({
            selector: 'app-addpage',
            templateUrl: './addpage.component.html',
            styleUrls: ['./addpage.component.scss']
        })
    ], AddpageComponent);
    return AddpageComponent;
}());
exports.AddpageComponent = AddpageComponent;

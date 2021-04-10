"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var contact_service_1 = require("./contact.service");
describe('ContactService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(contact_service_1.ContactService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

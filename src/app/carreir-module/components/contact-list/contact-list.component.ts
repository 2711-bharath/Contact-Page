import { Component, OnInit } from '@angular/core';
import { PersonServiceService } from '../../service/person-service.service';
import { Person } from '../../model/person.model';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {


  constructor(private service:PersonServiceService,private router:Router, private route:ActivatedRoute) { }
  contactDetails:Person[];
  ngOnInit(): void {
    this.contactDetails = this.service.getContactDetails();
  }

}

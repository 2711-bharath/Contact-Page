import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Contact } from 'src/app/career/model/contacts.model';
import { ContactService } from '../../career/service/contact.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router:Router,private service:ContactService) { }

  ngOnInit(): void {

  }

}

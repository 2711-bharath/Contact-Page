import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Contact } from 'src/app/career-module/model/contacts.model';
import { ContactService } from '../../career-module/service/contact.service';

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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Person } from 'src/app/carreir-module/model/person.model';
import { PersonServiceService } from '../../carreir-module/service/person-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router:Router,private service:PersonServiceService) { }

  ngOnInit(): void {
    let contactDetails:Person[] = this.service.getContactDetails();
    this.router.navigate(['/home',contactDetails[0].id])

  }

}

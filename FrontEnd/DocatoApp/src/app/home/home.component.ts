import { Component, OnInit } from '@angular/core';
import { getUsers } from '../models/users';
import { ListOfUsersService } from '../users/list-of-users.service';
import { UsersComponent } from '../users/users.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: getUsers[] = [];

  constructor(private listOfUsers: ListOfUsersService) { }

  getAll() {
    this.listOfUsers.getAll().subscribe(result => {
      this.users = result;
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

}

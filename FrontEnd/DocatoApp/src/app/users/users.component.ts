import { Component, OnInit } from '@angular/core';
import { getUsers } from '../models/users';
import { ListOfUsersService } from './list-of-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

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

import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  editUser: getUsers = new getUsers();
  registerUser: getUsers = new getUsers();
  modalDelete: boolean = false;
  modalEdit: boolean = false;
  modalRegister: boolean = false;
  id: number = 0;
  formGroup!: FormGroup;

  constructor(private listOfUsers: ListOfUsersService) { }

  getAll() {
    this.listOfUsers.getAll().subscribe(result => {
      this.users = result;
    });
  }

  async delete() {
    await this.listOfUsers.delete().subscribe(result => {
      console.log(result);
    });
    this.showModal(false, this.listOfUsers.id, 1);
    this.getAll();
  }

  async edit() {
    await this.listOfUsers.edit(this.editUser).subscribe(result => {
      console.log(result);
    });
    this.showModal(false, this.listOfUsers.id, 0);
    this.getAll();
  }

  async register() {
    await this.listOfUsers.register(this.registerUser).subscribe(result => {
      console.log(result);
    });
    this.showModal(false, this.listOfUsers.id, 2);
    this.getAll();
  }

  showModal(show: boolean, id: number, option: number) {
    if(option == 1) {
      this.modalDelete = show;
    } else if(option == 2) {
      this.modalRegister = show;
    } else {
      this.modalEdit = show;
    }
    this.listOfUsers.id = id;
  }

  ngOnInit(): void {
    this.getAll();
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      cpf: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

}

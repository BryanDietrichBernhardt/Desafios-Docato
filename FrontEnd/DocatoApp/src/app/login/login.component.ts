import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();

  formGroup!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
   }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  loginProcess() {
    console.log(this.user)

    if(this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(result => {
        if(result.success){
          console.log(result);
          alert(result.message);
          this.authService.loginUser(true);
        }else {
          alert(result.message);
          this.authService.loginUser(false);
        }
      })
    }
  }

}

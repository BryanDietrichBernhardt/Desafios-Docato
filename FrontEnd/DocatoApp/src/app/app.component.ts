import { AuthServiceService } from './auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DocatoApp';

  showNav: boolean = false;

  constructor(private AuthService:AuthServiceService) { }

  ngOnInit() {
    this.AuthService.showNavEmitter.subscribe(
      show => this.showNav = show
    );
  }
}

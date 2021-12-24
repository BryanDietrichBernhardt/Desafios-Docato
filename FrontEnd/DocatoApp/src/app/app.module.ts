import { AuthGuard } from './guards/auth.guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http'; //Importar para fazer as requisições
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Importar para fazer as requisições
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthServiceService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

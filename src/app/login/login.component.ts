import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { loginData } from './login.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

//these are the variables which are going to be apart of the type login data, they are using two way binding to get the typed information on the form
 username: string = "";
 password: string = "";


//this is an output to send the login data to the parent component app, using a created type called loginData which is being imported 
@Output() loginEvent = new EventEmitter<loginData>();

//this is the function binded to the component that uses the output to emit the login data to the app component
onSubmit(){
  this.loginEvent.emit({username: this.username,password: this.password});
}


}

import { Component, inject } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { type loginData } from './login/login.model';
import { HttpClient } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { Observable } from 'rxjs';
import { SignupData } from './signup/signup.model';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [LoginComponent,SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []

})
export class AppComponent {


  title = 'desafio-front';
  
  
  //these variables are used for starting an http request, the variable http client is injected with the type HttpClient which is imported
  //the url contains the exact path that we are sending our request 
  private httpClient = inject(HttpClient)
  private Url = "http://localhost:8080/login"
  private UrlSignup = "http://localhost:8080/signup"
  
 
  //this variable comes from the login component, it must have the logindata type
  //and is initialized without values here that is why its using ? , but is soon going to be given values coming from the child component 
  userInput?: loginData;


  signUpinput?: SignupData;
  signupMessage?:string = " ";

 
//these are variables used on the if decoratos on the html template to change between components
  isSigningUp?:boolean;
  isloggedIn?:boolean;
  loginMessage?:string = " ";

// this function sends a http request using the username and password(given as porameters) to populate the head of the request
// first we create the body variable and then we use the post method to send a request using the url and the body
  login(username:string, password: string): Observable<any>{
    const body = {username,password};
    return this.httpClient.post<any>(this.Url, body)
  }
  
  //this function is going to be triggered when we submit the form, it also calls for the function that is going to send a request
  //this functin will receive as a parameter the data that is coming from the child component and we are going to use it on the login function
  //then we "subscribe" to the login function so we can "hear" its returns (response from the backend or error ) and depending on the return we change the loginmessage 
  //variable so we can change the template of the component
  onLogin(data:loginData){
    //the data got from the child component app-login
    this.userInput = data
    this.login(this.userInput!.username, this.userInput!.password).subscribe({
      next: response => {
        this.isloggedIn = true;
        console.log('Resposta do backend:', response);
      },
      error: err => {
        console.log('Erro no login:', err);
        this.loginMessage = err.error?.message;
      }
    })

    
  }


  signup(username:string, password:string, email:string):Observable<any>{
    const body = {username,password,email}
    return this.httpClient.post<any>(this.UrlSignup, body)
  }


  onSignUp(data: SignupData) {
     //the data got from the child component app-signup
    this.signUpinput = data
    
    this.signup(this.signUpinput.username, this.signUpinput.password,this.signUpinput.email).subscribe(
      {
        next: response =>{
          this.signupMessage= 'Signup bem-sucedido!';
        console.log('Resposta do backend:', response);
        },
        error: err => {
          this.signupMessage = err.error?.message;
          console.log('Erro no signup:', err);
        }
      }
    )

    }


  
  notSignUp(){
     return this.isSigningUp = true
  }
  
  logout() {
    this.isloggedIn = false;
    }


}

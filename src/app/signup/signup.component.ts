import { Component, EventEmitter, Output } from '@angular/core';
import { type SignupData } from './signup.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  //initializing the variables that are going to be used on the form, they use two way data binding
   newUsername: string = ""
   newPassword: string = ""
   email: string = ""

  //outputing the event that is going to be triggered when the form is submitted to the parent component
    @Output() signupEvent = new EventEmitter<SignupData>();

   //this function is going to be triggered when the form is submitted, it emits the event to the parent component 
    onSubmit(){
      this.signupEvent.emit({
        username: this.newUsername,
        password: this.newPassword,
        email: this.email
      })
    }

}

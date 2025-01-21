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

   newUsername: string = ""
   newPassword: string = ""
   email: string = ""


    @Output() signupEvent = new EventEmitter<SignupData>();

    onSubmit(){
      this.signupEvent.emit({
        username: this.newUsername,
        password: this.newPassword,
        email: this.email
      })
    }

}

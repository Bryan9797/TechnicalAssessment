import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Login } from '../../interfaces/Login';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formSignup: FormGroup = this.formBuild.group({
    username:["",Validators.required],
    password:["",Validators.required]
  });

  signUp(){
      if(this.formSignup.invalid) return;

      const objeto:Login = {
          username: this.formSignup.value.username,
          password: this.formSignup.value.password
      }

      this.loginService.signup(objeto).subscribe({
          next: (data) =>{
                if(data.isSuccess){
                    this.router.navigate([''])
                }else{
                    alert("Failed trying to sign up")
                }
          }, error:(error) =>{
                console.log(error.message);
          }
      })

  }

  back(){
      this.router.navigate([''])
  }


}

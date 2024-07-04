import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);

  public formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    username:["",Validators.required],
    password:["",Validators.required]
  });

  logIn(){
    if(this.formLogin.invalid) return;

    const object:Login = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    }

    this.loginService.login(object).subscribe({
      next:(data) => {
        if(data.isSuccess) {
          console.log(data.token);
          localStorage.setItem("token", data.token)
          this.router.navigate(['index']);
        }else{
          alert("Username or password incorrect");
        }
      },
      error:(err) => {
        console.log(err.message);
      }
    });
  }

  signup(){
    this.router.navigate(['signup']);
  }

} 

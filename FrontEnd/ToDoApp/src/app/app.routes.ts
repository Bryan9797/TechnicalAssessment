import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { authGuard } from './custom/auth.guard';

export const routes: Routes = [
    {path:'',component: LoginComponent},
    {path:'signup', component: SignUpComponent},
    {path:'index', component: MainPageComponent, canActivate: [authGuard]},
];
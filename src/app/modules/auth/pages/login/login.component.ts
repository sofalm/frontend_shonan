import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../../../shared/services/shared.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: []
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(private formBuilder: FormBuilder,
                public sharedService: SharedService,
                private authService: AuthService,
                private router: Router) { }

    ngOnInit(): void {
        this.loadLoginForm();
    }

    loadLoginForm() : void {
        this.loginForm = this.formBuilder.group ({
            //email: ['', [Validators.required, Validators.email] ],
            //password1: ['', [Validators.required, Validators.minLength(8)] ]
            username: ['manuel.mdz.rom@gmail.com', [Validators.required, Validators.email] ],
            password: ['amtzran', [Validators.required, Validators.minLength(6)] ]
        })
    }

    login() : void {
        console.log(this.loginForm.value)
        if (this.loginForm.invalid) return;
        this.sharedService.spinnerShow();
        this.authService.login(this.loginForm.value)
            .subscribe(result => {
                console.log(result.data.user)
                //this.sharedService.spinnerHide();
                if (result.data.access_token === 'Ya estás autenticado') {
                    this.router.navigate(['/panel'])
                    //this.getIpAddress();
                }
                if (result.code == 200){
                    console.log('200')

                    this.router.navigate(['/panel']);
                    //this.loadUser();
                    //this.getIpAddress();
                } else {
                    //this.sharedService.spinnerHide()
                    //this.errorDialog(result.error);
                }
            })

    }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';

import { FormUtil } from 'src/app/util/form-util';
import { Login } from './../../model/login';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    formulario: FormGroup = this.formBuilder.group(new Login());

    constructor(
        private formBuilder: FormBuilder,
        public service: LoginService
    ) { }

    ngOnInit() {
        this.configurarFormulario();
    }

    private configurarFormulario(): void {
        this.userName.setValidators([Validators.required, Validators.maxLength(10)])
        this.password.setValidators([Validators.required, Validators.maxLength(10)])
    }

    get userName(): AbstractControl {
        return this.formulario.get('userName');
    }

    get password(): AbstractControl {
        return this.formulario.get('password');
    }

    efetuarLogin() {
        console.log(this.formulario)

        if (this.formulario.valid) {
            
            this.service.efetuarLogin(this.formulario.value);

            if (this.service.usuarioEstaAutenticado()) {
                this.service.mostrarMenuEmitter.emit(true);
                this.service.navigate(['']);
            } else {
                this.service.mostrarMenuEmitter.emit(false);
            }
        }
    }

    mostrarErro(controlName: string) {
        return FormUtil.mostrarErro(this.formulario, controlName);
    }
    
}

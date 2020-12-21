import { Login } from './../../model/login';
import { LoginService } from './login.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtil } from 'src/app/util/form-util';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    formularioLogin: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private service: LoginService
    ) { }

    ngOnInit() {
        this.configurarFormulario(new Login());
    }

    private configurarFormulario(login: Login): void {
        this.formularioLogin = this.formBuilder.group(
            login
        );
        this.login.setValidators([Validators.required, Validators.maxLength(10)])
        this.password.setValidators([Validators.required, Validators.maxLength(10)])
    }

    get login(): AbstractControl {
        return this.formularioLogin.get('login');
    }

    get password(): AbstractControl {
        return this.formularioLogin.get('password');
    }

    efetuarLogin() {
        if (this.formularioValido()) {
            this.service.efetuarLogin(this.formularioLogin.value);
            if (this.service.usuarioEstaAutenticado()) {
                this.service.mostrarMenuEmitter.emit(true);
                // this.service.navigate(['/']);
                this.service.navigate(['']);
            } else {
                this.service.mostrarMenuEmitter.emit(false);
            }
        }
    }

    // openModal(): Promise<any> {
    //     const ngbModalRef = this.modalService.open(
    //         ModalConfirmacaoComponent,
    //         {
    //             size: 'sm',
    //         });
    //     ngbModalRef.componentInstance.body = 'Gostaria de incluir a unidade? ';
    //     return ngbModalRef.result;
    // }

    // loginUnidade() {
    //     this.service.loginUnidade(this.formularioLogin.value)
    //         .subscribe(() => { this.router.navigate(['unidades']); });
    // }

    mostrarErro(controlName: string) {
        return FormUtil.mostrarErro(this.formularioLogin, controlName);
    }

    private formularioValido(): boolean {
        if (this.formularioLogin.invalid) {
            FormUtil.marcaComoDirtySeTemErro(this.formularioLogin);
            return false;
        } else {
            return true;
        }
    }

    cancelar() {
        console.log('cancelou o login');
        //  this.router.navigate(['unidades',]);
    }
}

import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { debounce, debounceTime, first, map, switchMap } from 'rxjs/operators';

import { EmailService } from './email.service';

@Injectable(
    // {
    //     providedIn: 'root'
    // }
)
export class EmailValidationsService {

    constructor(private emailService: EmailService) { }

    emailExiste() {

        return (control: AbstractControl): ValidationErrors | null => {

            return control.valueChanges
                // aguarda 300 segundos
                .pipe(debounceTime(300))
                // pega o valor emitito pelo valuesChange (valor digitado no input) 
                // passa o valor para o switchMap e pare de ouvir novas emissões do valueChanges
                // e agora passe a ouvir a emissão/emissões do verificarEmail
                .pipe(switchMap(valorDigitado =>

                    this.emailService.verificarEmail(valorDigitado)))
                // quando receber a emissao do verificarEmail, mapeia a resposta em um obj {} ou em null 
                .pipe(map((emailExiste: boolean) => emailExiste ? { emailExiste: true } : null))
                // o primeiro valor que for emitido {} ou null completa a emissão;
                .pipe(first());
        }
    }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, map, tap } from "rxjs/operators";

@Injectable(
    // {
    //     providedIn: 'root'
    // }
)

export class EmailService {

    constructor(private http: HttpClient) { }

    verificarEmail(email: string): Observable<boolean> {
        return this.http.get('assets/dados/emails.json')
            .pipe(
                delay(3000),
                map((response: any) => response.emails),
                tap(console.log),
                // map((listaDeEmails: Array<any>) => listaDeEmails.filter(e => e.email === email)),
                map((listaDeEmails: Array<any>) => listaDeEmails.some((e) => e.email === email)),
                tap(console.log),
            );
    }
}
import { Component, OnInit } from '@angular/core';
import { LoginService } from './views/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mostrarMenu = false;
  title = 'prj-angular';

  constructor(private service: LoginService) { }

  ngOnInit() {
    this.service.mostrarMenuEmitter.subscribe((mostrarMenu: boolean) => this.mostrarMenu = mostrarMenu);
  }




}

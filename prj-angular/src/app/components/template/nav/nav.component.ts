import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/views/login/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  mostrarMenu = false;

  constructor(private service: LoginService) { }

  ngOnInit() {
    this.service.mostrarMenuEmitter.subscribe((mostrarMenu: boolean) => this.mostrarMenu = mostrarMenu);
  }

}

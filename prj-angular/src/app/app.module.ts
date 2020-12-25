import { SharedModule } from 'src/app/shared/shared.module';
import { FundoVermelhoDirective } from './directives/fundo-vermelho.directive';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';
import { HomeComponent } from './views/home/home.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { LoginComponent } from './views/login/login.component';
// import { TurmaGuard } from './views/turmas/guard/turma.guard';
import { LoginService } from './views/login/login.service';
// import { AuthGuard } from './guards/auth.guard';
import { DeactivateGuard } from './guards/deactivate.guard';
import { CursoGuard } from './guards/curso.guard';
import { PaginaNaoEncontradaComponent } from './views/pagina-nao-encontrada/pagina-nao-encontrada.component';

//import { UnidadesModule } from './views/unidades/unidades.module';
//import { TurmasModule } from './views/turmas/turmas.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FundoVermelhoDirective,
    AppComponent,
    ModalConfirmacaoComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    }),
    //UnidadesModule,    
    //TurmasModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    // {
    //   provide: LOCALE_ID,
    //   useValue: 'pt-BR'
    // },
    // AuthGuard,
    CursoGuard,
    DeactivateGuard,
    LoginService
    // TurmaGuard
  ],
  exports: [],
  entryComponents: [ModalConfirmacaoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

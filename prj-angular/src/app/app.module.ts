import { TurmasModule } from './views/turmas/turmas.module';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';
/**
 * Angular
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/**
 * Ng-Bootstrap
 */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

/**
 * My-App
 */
// import { UnidadesModule } from './views/unidades/unidades.module';
/**
 * My Components
 */
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
/**
 * My Directives
 */
import { RedDirective } from './directives/red.directive';
/**
 * My Views
 */
import { HomeComponent } from './views/home/home.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { LoginComponent } from './views/login/login.component';
import { UnidadesModule } from './views/unidades/unidades.module';

@NgModule({
  declarations: [    
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RedDirective,
    AppComponent,
    ModalConfirmacaoComponent,
    LoginComponent,
  ],
  // exports:[GridComponent],
  imports: [
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    }),
    UnidadesModule,    
    TurmasModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  exports: [],
  entryComponents: [ModalConfirmacaoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

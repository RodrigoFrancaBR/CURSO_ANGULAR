import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSliderModule, MatSidenavModule, MatListModule, MatSnackBarModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormMensagemComponent } from '../components/form-mensagem/form-mensagem.component';

@NgModule({
    declarations: [
        FormMensagemComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FormMensagemComponent,
        // loiane
        // MatToolbarModule,
        // MatButtonModule,
        // MatTableModule,
        // MatIconModule,
        // MatFormFieldModule,
        // MatCardModule,
        // MatInputModule
        MatSliderModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
    ]
})
export class AppMaterialModule { }

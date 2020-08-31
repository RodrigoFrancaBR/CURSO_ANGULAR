import { FormUtil } from 'src/app/util/form-util';
import { ToastrMensagemUtil } from 'src/app/util/toastr-mensagem-util';
import { ToastrService } from 'ngx-toastr';
import { Unidade } from './../../../model/unidade';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadeService } from '../unidade.service';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { animate, style } from '@angular/animations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private service: UnidadeService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  // unidade: Unidade = {};
  formulario: FormGroup;

  ngOnInit() {
    ToastrMensagemUtil.info(this.toastr, 'Bem vindo a tela de cadastro de unidade');
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this.formulario = this.formBuilder.group(
      new Unidade()
      //   {
      //   id: [null, [Validators.required]],
      //   nome: [null, [Validators.required]],
      //   endereco: [null, [Validators.required]],
      //   status: [null, [Validators.required]],
      // }
    );
    this.getId().setValidators([Validators.required, FormUtil.valorMinimo()]);

  }

  getId(): AbstractControl {
    return this.formulario.get('id');
  }

  get id(): number {
    return Number(this.getId().value);
  }

  getNome(): AbstractControl {
    return this.formulario.get('nome');
  }

  get nome(): string {
    return String(this.getNome().value);
  }

  getEndereco(): AbstractControl {
    return this.formulario.get('endereco');
  }

  get endereco(): string {
    return String(this.getEndereco().value);
  }

  getStatus(): AbstractControl {
    return this.formulario.get('status');
  }

  get status(): string {
    return String(this.getStatus().value);
  }

  salvar() {
    let u = new Unidade(this.id, this.nome, this.endereco, this.status);
    console.log(this.formulario);
    console.log(u);
    console.log(this.getId().valid);
    // console.log(this.formulario.getI);
    console.log(typeof this.id === 'number');
    // console.log(this.formulario)

    // this.service.salvarUnidade(this.unidade).subscribe((res) => {
    //   // tslint:disable-next-line: max-line-length
    //   return (res.id > 0 ? ToastrMensagemUtil.success(this.toastr, 'unidade salva com sucesso ' + res.id) : ToastrMensagemUtil.error(this.toastr, ''));
    // },
    //   (error: any) => {
    //     console.log(error);
    //   });
  }

  cancelar() {
    this.router.navigate(['unidades']);
  }

}

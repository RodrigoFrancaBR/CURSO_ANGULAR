import { ToastrService } from '../../../node_modules/ngx-toastr/toastr/toastr.service';

const TITULO = 'Curso Preparatório';

export class ToastrMensagemUtil {
    public static error(toastr: ToastrService, msg: string) {
        toastr.error(msg, TITULO, {
            // timeOut: 5000,
            positionClass: 'toast-top-center',
            // easing: 'ease-in-out',
            // easeTime: 300,
            // extendedTimeOut: 1000,
            // progressBar: true,
            // progressAnimation: 'increasing'
        });
    }

    public static info(toastr: ToastrService, msg: string) {
        toastr.info(msg, TITULO, {
            // timeOut: 5000,
            positionClass: 'toast-top-center',
            // easing: 'ease-in-out',
            // easeTime: 300,
            // extendedTimeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
        });
    }

    public static success(toastr: ToastrService, msg: string) {
        toastr.success(msg, TITULO, {
            // timeOut: 5000,
            positionClass: 'toast-top-center',
            // easing: 'ease-in-out',
            // easeTime: 300,
            // extendedTimeOut: 1000,
             progressBar: true,
             progressAnimation: 'increasing'
        });
    }

    public static warning(toastr: ToastrService, msg: string) {
        toastr.warning(msg, TITULO, {
            // timeOut: 5000,
            positionClass: 'toast-top-center',
            // easing: 'ease-in-out',
            // easeTime: 300,
            // extendedTimeOut: 1000,
             progressBar: true,
             progressAnimation: 'increasing'
        });
    }

    //   public static tratarErro(toastrService: ToastrService, error, tituloMsg?: string) {
    //     const title = tituloMsg ? tituloMsg : 'Erro';
    //     if (error.status === 500) {
    //       ToastrMensagemUtil.error(toastrService, mensagens_servico.ERRO_500, TituloMensConst.TEXTO_DA_CONSTANTE);
    //     } else if (error.status === 401) {
    //       ToastrMensagemUtil.error(toastrService, mensagens_servico.ERRO_401, TituloMensConst.TEXTO_DA_CONSTANTE);
    //     } else {
    //       ToastrMensagemUtil.error(toastrService, error.error, title);
    //     }
    //   }
}

import { ToastrService } from '../../../node_modules/ngx-toastr/toastr/toastr.service';
import { HttpErrorResponse } from '@angular/common/http';

const TITULO = 'Curso Preparatório';

const MESSAGE_SUCCESS: { [status: number]: string } = {
    200: 'Unidade encontrada com sucesso!',
    201: 'Created F',
};

const MESSAGE_ERROR: { [status: number]: string } = {
    400: 'Bad Request F',
    401: 'Unauthorized F',
    403: 'Forbidden F',
    404: 'Unidade não encontrada',
    405: 'Method Not Allowed F',
    408: 'Request Timeout F',
    500: 'Internal Server Error F'
};

export class ToastrMensagemUtil {
    public static error(toastrService: ToastrService, msg: string) {
        toastrService.error(msg, TITULO, {
            // timeOut: 5000,
            positionClass: 'toast-top-center',
            // easing: 'ease-in-out',
            // easeTime: 300,
            // extendedTimeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
        });
    }

    public static info(toastrService: ToastrService, msg: string) {
        toastrService.info(msg, TITULO, {
            // timeOut: 5000,
            positionClass: 'toast-top-center',
            // easing: 'ease-in-out',
            // easeTime: 300,
            // extendedTimeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
        });
    }

    public static success(toastrService: ToastrService, msg: string) {
        toastrService.success(msg, TITULO, {
            // timeOut: 5000,
            positionClass: 'toast-top-center',
            // easing: 'ease-in-out',
            // easeTime: 300,
            // extendedTimeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
        });
    }

    public static warning(toastrService: ToastrService, msg: string) {
        toastrService.warning(msg, TITULO, {
            // timeOut: 5000,
            positionClass: 'toast-top-center',
            // easing: 'ease-in-out',
            // easeTime: 300,
            // extendedTimeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
        });
    }

    public static tratarError(toastrService: ToastrService, status: number) {
        let message: string;

        if (status) {
            message = MESSAGE_ERROR[status];
        }

        ToastrMensagemUtil.error(toastrService, message);
    }

    public static tratarSuccces(toastrService: ToastrService, status: number) {
        let message: string;

        if (status) {
            message = MESSAGE_SUCCESS[status];
        }

        ToastrMensagemUtil.success(toastrService, message);
    }
}

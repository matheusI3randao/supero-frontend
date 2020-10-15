import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpUtilService {

  public static API = 'http://localhost:8000/';

  constructor(private mensageiro: NzMessageService) { }

  url(path: string) {
    return HttpUtilService.API + path;
  }

  processarErros(erro: Response | any) {
    switch (erro.status) {
      case 400:
        erro = `400 - ${erro.error.mensagem ? erro.error.mensagem : 'Requisição inválida'}.`;
        break;
      case 401:
        erro = '401 - O recurso requisitado não foi autorizado.';
        break;
      case 403:
        erro = '403 - Recurso requisitado proíbido.';
        break;
      case 404:
        erro = '404 - O recurso requisitado não existe.';
        break;
      case 405:
        erro = '405 - Método não permitido.';
        break;
      case 500:
        erro = '500 - Ocorreu um erro inesperado. Comunique o administrador do Sistema.';
        break;
      case 504:
        erro = '504 - Servidor fora do ar.';
        break;
      default:
        erro = erro.error;
        break;
    }


    this.mensageiro.error(erro);

    return throwError(erro);
  }
}

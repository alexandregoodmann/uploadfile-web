import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { XMLParser } from 'fast-xml-parser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agentes, RegiaoEnum } from '../model/models';


@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  constructor(private http: HttpClient) { }

  prepareUpload(content: string): Agentes {

    const parser = new XMLParser({ attributeNamePrefix: '', ignoreAttributes: false });
    const json = parser.parse(content);

    let agentes = json.agentes as Agentes;

    if (!(agentes.agente instanceof Array)) {
      let temp = new Agentes();
      temp.agente.push(agentes.agente);
      agentes = temp;
    }

    agentes.agente.forEach(agente => {
      agente.regiao.forEach(reg => {
        reg.precoMedio.valor = [];
      });
    });

    return agentes;
  }

  upload(obj: Agentes): Observable<[]> {
    return this.http.post<[]>(`${environment.url}/upload`, obj, httpOptions);
  }

  findByRegiao(regiao: string): Observable<[]> {
    return this.http.get<[]>(`${environment.url}/upload/regiao/${regiao}`, httpOptions);
  }
}

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
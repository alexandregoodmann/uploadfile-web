import { Component, OnInit } from '@angular/core';
import { UploadfileService } from 'src/app/service/uploadfile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'data', 'compra', 'geracao'];
  dataSource!: rowRegiao[];

  constructor(
    private uploadService: UploadfileService
  ) { }

  ngOnInit(): void {
  }

  setRegiao(event: any) {
    if (event.value !== undefined) {
      this.uploadService.findByRegiao(event.value).subscribe(agentes => {
        this.dataSource = [];
        agentes.forEach((agente: any) => {
          agente.regiao.forEach((reg: any) => {
            let row = new rowRegiao();
            row.codigo = agente.codigo;
            row.data = agente.data;
            row.compra = reg.compra.valor;
            row.geracao = reg.compra.valor;
            this.dataSource.push(row);
          });
        });

      });
    }
  }

}

export class rowRegiao {
  codigo!: number;
  data!: Date;
  compra!: [];
  geracao!: [];
}
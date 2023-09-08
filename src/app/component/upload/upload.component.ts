import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadfileService } from '../../service/uploadfile.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  group!: FormGroup;
  fileName = '';
  file!: File;
  registros = []; 

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private uploadService: UploadfileService
  ) { }

  ngOnInit() {
    this.group = this.fb.group({
      file: [null, [Validators.required]]
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    this.group.get('file')?.setValue(this.fileName);
  }

  sendFile(form: any) {
    this.file.text().then(result => {
      let agentes = this.uploadService.prepareUpload(result);
      this.uploadService.upload(agentes).subscribe(data => {
        this.registros = data;
        this.fileName = '';
        form.reset();
      }, (err) => {
        console.log(err);
      });
    }).catch(error => {
      console.log('Error trying to read de file', error);
      throw error;
    });
  }

  private openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}

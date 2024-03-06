import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {FileDetails} from "./file-details";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) { }

  upload(file: File): Observable<FileDetails> {
    console.log("uploading file");
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log(formData);
    return this.httpClient.post<FileDetails>(`/api/uploadFile`, formData);
  }
}

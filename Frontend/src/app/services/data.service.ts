import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { URIConstants } from '../../utils/URIConstant';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(environment.API_URL + URIConstants.getData, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  saveData(updatedEntry: any) {
    return this.http.post(environment.API_URL + URIConstants.saveData, {updatedEntry}, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

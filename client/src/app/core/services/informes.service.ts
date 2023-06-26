import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import config from 'config/config';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  typeviw!: boolean;
  typeview!: boolean;
  
  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  showDialog: boolean = false;

  constructor() { }
}

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private clientsSubject$ = new BehaviorSubject<Client[]>([]);
  readonly clients$: Observable<Client[]> = this.clientsSubject$.asObservable();

  stateEvent = new EventEmitter<StateEvent<Client>();


  constructor(
    private http: HttpClient
  ) { }


}



export abstract class StateEvent<T> {
  action: string = '';
  payload?: T | Partial<T> | T[];

  constructor(action: string, payload?: T) {
    this.action = action;
    this.payload = payload;
  }
}

export class ClientStateEvent extends StateEvent<Client> {
  super() {}
}


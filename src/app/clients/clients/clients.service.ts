import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ClientStateService } from 'src/app/state/clients/client-state.service';
import { Client } from '../../state/clients/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private url: string = '/clients';

  constructor(
    private fromClientState: ClientStateService,
    private http: HttpClient
  ) { }

  getClients(): Observable<Client[]>{
    return this.fromClientState.clients$.pipe(
      filter(clients => clients?.length === 0),
      switchMap(() => {
        this.fromClientState.s
        return this.http.get<Client[]>(this.url)
      })
    )
  }



}




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ClientStateService } from 'src/app/state/clients/client-state.service';
import { Client } from '../../state/clients/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private url: string = '/clients';

  constructor(
    private clientStateService: ClientStateService,
    private http: HttpClient
  ) { }

  getClients(): Observable<Client[]>{
    return this.clientStateService.clients$.pipe(
      // if no clients in state, fetch clients
      filter(clients => clients?.length === 0),
      tap(() => {
        this.clientStateService.setState({
          isLoading: true,
          clients: []
        })
      }),
      switchMap(() => {
        return this.http.get<Client[]>(this.url)
      }),
      tap(clients => {
        this.clientStateService.setState({
          isLoading: false,
          clients
        })
      })
    )
  }

  fetchClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  updateClientById(client: Client): void {
    this.http.put<Client>(this.url, { client }).subscribe(updatedClient => {
      this.clientStateService.updateClientById(updatedClient);
    });
  }

  deleteClientById(id: string): void {
    this.http.delete(id).subscribe(deletedClient => {
      this.clientStateService.deleteClientById(id);
    });
  }

}




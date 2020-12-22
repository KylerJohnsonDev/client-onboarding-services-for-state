import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Client } from 'src/app/state/clients/client';
import { StateServiceBase } from '../state-service-base';
import { ClientState, initialState } from './client-state';

@Injectable({
  providedIn: 'root'
})
export class ClientStateService extends StateServiceBase<ClientState> {

  constructor() {
    super(initialState);
  }

  clientState$ = this.selectState().pipe(
    map(state => {
      state.clients.sort((a, b) => {
        // sort clients alphabetically by namee
        return a.name.localeCompare(b.name);
      })
    })
  )

  clients$ = this.selectState().pipe(
    distinctUntilChanged((oldState, newState) => {
      // only emit a new value when the clients array has been updated
      return JSON.stringify(oldState.clients) === JSON.stringify(newState.clients);
    }),
    map(state => {
      state.clients.sort((a, b) => {
        // sort clients alphabetically by namee
        return a.name.localeCompare(b.name);
      });
      return state.clients;
    })
  )

  isLoading$ = this.selectState().pipe(
    distinctUntilChanged(),
    map(state => state.isLoading)
  );

  selectNumberOfClients(): Observable<number> {
    return this.selectState().pipe(
      map(({ clients }) => {
        const numClients = clients?.length || 0;
        return numClients;
      })
    )
  }

  selectClientById(id: string): Observable<Client|undefined> {
    return this.selectState().pipe(
      map(({ clients }) => {
        return clients.find(client => client.id === id);
      })
    );
  }

  updateLoadingState(value: boolean): void {
    this.updateStateByProperty('isLoading', value);
  }

  updateClientById(client: Client): void {
    const stateClone = this.selectStateSnapshot();
    const clientIndex = stateClone.clients.findIndex(x => x.id === client.id);
    stateClone.clients[clientIndex] = client;
    this.setState(stateClone);
  }




}

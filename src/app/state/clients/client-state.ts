import { Client } from "src/app/state/clients/client";

export class ClientState {
  constructor(
    public isLoading: boolean,
    public clients: Client[]
  ) {}
}

export const initialState: ClientState = {
  isLoading: true,
  clients: []
}

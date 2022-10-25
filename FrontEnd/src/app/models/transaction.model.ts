import { Client } from './client.model';

export interface Transaction {
  id: number;

  amount: number;

  giver?: Client;

  receiver?: Client;

  createdOn: Date;
}

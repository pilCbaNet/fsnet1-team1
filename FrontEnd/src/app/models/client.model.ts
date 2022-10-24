import { Transaction } from './transaccion.model';

export interface Client {
  id: number;
  name: string;

  balance: number;

  transfers: Transaction[];

  deposits: Transaction[];
}

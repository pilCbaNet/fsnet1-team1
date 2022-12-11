import { Transaction } from './transaction.model';

// export interface Client {
//   id?: number;
//   name: string;

//   balance: number;

//   transfers: Transaction[];

//   deposits: Transaction[];
// }

export interface Client {
  id?: number;
  cbu: string;
  saldo: number;
  fechaAlta: any;
  fechaBaja: any;
  transfers: Transaction[];
  deposits: Transaction[];
}

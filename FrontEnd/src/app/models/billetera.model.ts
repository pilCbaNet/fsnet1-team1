import { Transaction } from "./transaccion.model";
import { User } from "./user.model";

export interface Billetera {
    user: User;
    nombre: string;
    cantidad: number;
    moneda: string;
    transactions: Transaction[];
}
import { User } from 'src/auth/entities/user.entity';
import { Transaction } from 'src/Transaction/entities/transaction.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: 0 })
  balance: number;

  @OneToOne(() => User, (u) => u.client)
  user: User;

  @OneToMany(() => Transaction, (t) => t.giver)
  transfers: Transaction[];

  @OneToMany(() => Transaction, (t) => t.receiver)
  deposits: Transaction[];
}

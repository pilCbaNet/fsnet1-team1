import { Client } from 'src/client/entities/client.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  amount: number;

  @ManyToOne(() => Client, (c) => c.transfers)
  giver: Client;

  @ManyToOne(() => Client, (c) => c.deposits)
  receiver: Client;

  @CreateDateColumn({ type: 'date' })
  createdOn: Date;
}

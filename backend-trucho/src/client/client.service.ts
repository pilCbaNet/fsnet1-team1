import { Inject, Injectable, HttpException } from '@nestjs/common';
import { Client } from 'src/client/entities/client.entity';
import { Repository } from 'typeorm';
import { AddBalanceDto } from './dto/add-balance.dto';

@Injectable()
export class ClientService {
  constructor(
    @Inject('CLIENT_REPOSITORY')
    private clientRepository: Repository<Client>,
  ) {}

  findAll() {
    return this.clientRepository.find({
      relations: { transfers: true, deposits: true },
    });
  }

  async findOne(id: number) {
    const c = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.transfers', 'transfers')
      .leftJoinAndSelect('transfers.receiver', 'receiver')
      .leftJoinAndSelect('client.deposits', 'deposits')
      .leftJoinAndSelect('deposits.giver', 'giver')
      .where('client.id = :id', { id })
      .getOne();

    if (!c) {
      throw new HttpException('Cliente no encontrado', 404);
    }

    //query mal hecha, solucion vaga
    c.transfers = c.transfers.map((t) => {
      t.receiver.balance = undefined;
      return t;
    });

    c.deposits = c.deposits.map((t) => {
      t.giver.balance = undefined;
      return t;
    });

    return c;
  }

  async findOneByName(name: string) {
    const c = await this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.transfers', 'transfers')
      .leftJoinAndSelect('transfers.receiver', 'receiver')
      .leftJoinAndSelect('client.deposits', 'deposits')
      .leftJoinAndSelect('deposits.giver', 'giver')
      .where('client.name = :name', { name })
      .getOne();

    if (!c) {
      throw new HttpException('Cliente no encontrado', 404);
    }

    return c;
  }

  async addBalance(addBalanceDto: AddBalanceDto) {
    const c = await this.findOne(addBalanceDto.clientId);

    c.balance += addBalanceDto.balance;

    return c.save();
  }
}
